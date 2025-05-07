import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Get session ID from cookie
    const sessionId = cookies().get("session_id")?.value

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 },
      )
    }

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()

    const db = client.db("raffily")

    // Find session
    const session = await db.collection("sessions").findOne({ id: sessionId })

    if (!session) {
      await client.close()
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 },
      )
    }

    // Get all user's raffles
    const raffles = await db.collection("raffles").find({ userId: session.userId }).sort({ createdAt: -1 }).toArray()

    await client.close()

    // Return raffles
    return NextResponse.json(raffles)
  } catch (error) {
    console.error("Error fetching raffles:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching raffles",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
