import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prizeName, brandingData, platform } = await req.json()

    if (!prizeName || !brandingData || !platform) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          success: false,
        },
        { status: 400 },
      )
    }

    // Instead of generating an image on the server,
    // we'll return the data needed for client-side rendering
    return NextResponse.json({
      data: {
        prizeName,
        brandingData,
        platform,
      },
      success: true,
    })
  } catch (error) {
    console.error("Error processing ad data:", error)
    return NextResponse.json(
      {
        error: "Failed to process ad data: " + (error instanceof Error ? error.message : String(error)),
        success: false,
      },
      { status: 500 },
    )
  }
}
