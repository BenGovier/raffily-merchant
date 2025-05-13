import { NextResponse } from "next/server"
import { getClickSendAuthHeader, setupDefaultSender } from "@/lib/clicksend-config"
import { CreditModel } from "@/models/credit"
import { CampaignModel } from "@/models/campaign"
import { calculateCreditsNeeded } from "@/lib/stripe-config"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    const { message, phoneNumbers, raffleId, userId, campaignName } = await request.json()

    if (!message || !phoneNumbers || phoneNumbers.length === 0) {
      return NextResponse.json({ error: "Message and phone numbers are required" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if user has enough credits
    const creditsNeeded = calculateCreditsNeeded(phoneNumbers.length)
    let creditCheck = { success: false, message: "", remainingCredits: 0, credit: null }

    try {
      creditCheck = await CreditModel.useCredits(
        userId,
        creditsNeeded,
        `SMS campaign: ${campaignName || "Unnamed campaign"}`,
        {
          raffleId,
          recipientCount: phoneNumbers.length,
          campaignType: "sms",
        },
      )
    } catch (error: any) {
      console.error("Error during credit check:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Error during credit check: " + error.message,
          remainingCredits: 0,
          creditsNeeded,
        },
        { status: 500 },
      )
    }

    if (!creditCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: creditCheck.message,
          remainingCredits: creditCheck.remainingCredits,
          creditsNeeded,
        },
        { status: 402 }, // 402 Payment Required
      )
    }

    // Create a campaign record
    const campaign = await CampaignModel.create({
      merchantId: new ObjectId(userId),
      type: "sms",
      name: campaignName || `SMS Campaign ${new Date().toLocaleDateString()}`,
      content: message,
      recipients: phoneNumbers.length,
      delivered: 0, // Will be updated after sending
      status: "sent",
      sentAt: new Date(),
      metadata: {
        raffleId,
        creditTransactionId: creditCheck.credit?._id?.toString(),
      },
    })

    // Format the messages for ClickSend API
    const messages = phoneNumbers.map((phoneNumber) => ({
      body: message,
      to: phoneNumber,
      custom_string: `raffle_id:${raffleId},campaign_id:${campaign._id}`,
    }))

    console.log("Sending SMS with payload:", JSON.stringify({ messages }))

    // Create the Authorization header
    const authHeader = getClickSendAuthHeader()

    // Call the ClickSend API
    const response = await fetch("https://rest.clicksend.com/v3/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        messages: messages,
      }),
    })

    console.log("ClickSend API response status:", response.status)

    const data = await response.json()
    console.log("ClickSend API response body:", JSON.stringify(data))

    // Check if the API call was successful
    if (response.ok) {
      // Update the campaign with delivery info
      await CampaignModel.update(campaign._id as ObjectId, {
        delivered: phoneNumbers.length, // Assuming all delivered for now
        status: "sent",
        metadata: {
          ...campaign.metadata,
          clickSendResponse: data,
        },
      })

      return NextResponse.json({
        success: true,
        data: data,
        remainingCredits: creditCheck.remainingCredits,
        campaignId: campaign._id?.toString(),
      })
    } else {
      console.error("ClickSend API error:", data)

      // Update campaign status to failed
      await CampaignModel.update(campaign._id as ObjectId, {
        status: "failed",
        metadata: {
          ...campaign.metadata,
          clickSendResponse: data,
          error: data.response_msg || "Failed to send SMS",
        },
      })

      // If we get an error about sender ID, try to set up a default sender
      if (data.response_msg?.includes("sender") || data.response_code === "INVALID_SENDER_ID") {
        console.log("Attempting to set up default sender...")

        // Try to determine the country code from the first phone number
        const countryCode = phoneNumbers[0].startsWith("+44") ? "GB" : "US"
        const senderSetup = await setupDefaultSender(countryCode)

        // Refund the credits since the message failed
        await CreditModel.addCredits(
          userId,
          creditsNeeded,
          "refund",
          undefined,
          "Refund for failed SMS campaign due to sender ID issue",
          {
            raffleId,
            campaignId: campaign._id?.toString(),
          },
        )

        return NextResponse.json(
          {
            success: false,
            error: "Sender ID issue detected. We've attempted to set up a default sender. Please try again.",
            details: data,
            senderSetup,
            creditsRefunded: true,
          },
          { status: response.status },
        )
      }

      // Refund the credits since the message failed
      await CreditModel.addCredits(userId, creditsNeeded, "refund", undefined, "Refund for failed SMS campaign", {
        raffleId,
        campaignId: campaign._id?.toString(),
      })

      return NextResponse.json(
        {
          success: false,
          error: data.response_msg || "Failed to send SMS",
          details: data,
          creditsRefunded: true,
        },
        { status: response.status },
      )
    }
  } catch (error) {
    console.error("Error sending SMS:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while sending SMS",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

