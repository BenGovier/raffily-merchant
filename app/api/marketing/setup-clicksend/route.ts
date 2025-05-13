import { NextResponse } from "next/server"
import { setupDefaultSender, getCompliantSenderTypes } from "@/lib/clicksend-config"

export async function POST(request: Request) {
  try {
    const { countryCode = "GB" } = await request.json()

    // First, get compliant sender types to see what's available
    const compliantTypes = await getCompliantSenderTypes(countryCode)

    // Then set up the default sender
    const setupResult = await setupDefaultSender(countryCode)

    return NextResponse.json({
      success: true,
      compliantTypes,
      setupResult,
    })
  } catch (error) {
    console.error("Error setting up ClickSend:", error)

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while setting up ClickSend",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

