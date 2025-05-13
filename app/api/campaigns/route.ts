import { NextResponse } from "next/server"
import { CampaignModel } from "@/models/campaign"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const type = searchParams.get("type") as "sms" | "email" | "social" | undefined
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get campaigns
    const campaigns = await CampaignModel.getByMerchant(userId, type, page, limit)

    // Get stats
    const stats = await CampaignModel.getStats(userId, type)

    return NextResponse.json({
      success: true,
      campaigns: campaigns.map((c) => ({
        ...c,
        _id: c._id?.toString(),
        merchantId: c.merchantId.toString(),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        scheduledFor: c.scheduledFor?.toISOString(),
        sentAt: c.sentAt?.toISOString(),
      })),
      stats,
    })
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const campaignData = await request.json()

    if (!campaignData.merchantId || !campaignData.type || !campaignData.content) {
      return NextResponse.json({ error: "Merchant ID, type, and content are required" }, { status: 400 })
    }

    // Create campaign
    const campaign = await CampaignModel.create({
      ...campaignData,
      merchantId: new ObjectId(campaignData.merchantId),
      status: campaignData.status || "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      campaign: {
        ...campaign,
        _id: campaign._id?.toString(),
        merchantId: campaign.merchantId.toString(),
        createdAt: campaign.createdAt.toISOString(),
        updatedAt: campaign.updatedAt.toISOString(),
        scheduledFor: campaign.scheduledFor?.toISOString(),
        sentAt: campaign.sentAt?.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ success: false, error: "Failed to create campaign" }, { status: 500 })
  }
}

