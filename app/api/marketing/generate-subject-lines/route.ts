import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { raffleDetails } = await request.json()

    if (!raffleDetails) {
      return NextResponse.json({ error: "Missing raffle details" }, { status: 400 })
    }

    // Simple validation to ensure we have the minimum required data
    if (!raffleDetails.raffleName || !raffleDetails.prize) {
      return NextResponse.json({ error: "Raffle name and prize are required" }, { status: 400 })
    }

    // Create a prompt for generating subject lines
    const prompt = `
      Generate 5 engaging email subject lines for a raffle promotion with the following details:
      - Raffle Name: ${raffleDetails.raffleName}
      - Prize: ${raffleDetails.prize}
      ${raffleDetails.deadline ? `- Deadline: ${raffleDetails.deadline}` : ""}
      ${raffleDetails.businessName ? `- Business Name: ${raffleDetails.businessName}` : ""}
      ${raffleDetails.additionalInfo ? `- Additional Info: ${raffleDetails.additionalInfo}` : ""}
      
      The subject lines should be attention-grabbing, create urgency, and highlight the prize.
      Format the response as a JSON array of strings.
    `

    // If no OpenAI API key is available, return mock data
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found, returning mock data")
      return NextResponse.json({
        subjectLines: [
          `Win a ${raffleDetails.prize} in our ${raffleDetails.raffleName} Raffle!`,
          `Last Chance: Enter to Win ${raffleDetails.prize}!`,
          `Don't Miss Out: ${raffleDetails.prize} Giveaway Ending Soon!`,
          `[EXCLUSIVE] Your Chance to Win a ${raffleDetails.prize}`,
          `${raffleDetails.businessName || "We"}'re Giving Away a ${raffleDetails.prize}! Enter Now!`,
        ],
      })
    }

    // Generate subject lines using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 300,
    })

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content || ""

    // Try to parse the JSON response
    let subjectLines = []
    try {
      // First try to parse as JSON directly
      subjectLines = JSON.parse(responseContent)
    } catch (e) {
      // If that fails, try to extract JSON from the text
      const jsonMatch = responseContent.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          subjectLines = JSON.parse(jsonMatch[0])
        } catch (e2) {
          // If all parsing fails, split by newlines and clean up
          subjectLines = responseContent
            .split("\n")
            .filter((line) => line.trim().length > 0)
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .slice(0, 5)
        }
      } else {
        // Last resort: split by newlines and clean up
        subjectLines = responseContent
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map((line) => line.replace(/^\d+\.\s*/, "").trim())
          .slice(0, 5)
      }
    }

    // Ensure we have at least some subject lines
    if (!Array.isArray(subjectLines) || subjectLines.length === 0) {
      subjectLines = [
        `Win a ${raffleDetails.prize} in our ${raffleDetails.raffleName} Raffle!`,
        `Last Chance: Enter to Win ${raffleDetails.prize}!`,
        `Don't Miss Out: ${raffleDetails.prize} Giveaway Ending Soon!`,
        `[EXCLUSIVE] Your Chance to Win a ${raffleDetails.prize}`,
        `${raffleDetails.businessName || "We"}'re Giving Away a ${raffleDetails.prize}! Enter Now!`,
      ]
    }

    return NextResponse.json({ subjectLines })
  } catch (error) {
    console.error("Error generating subject lines:", error)
    return NextResponse.json(
      {
        error: "Failed to generate subject lines",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

