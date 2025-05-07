import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"

export async function POST() {
  let client
  try {
    // Get session ID from cookie
    const sessionId = cookies().get("session_id")?.value

    if (sessionId) {
      // Connect to MongoDB
      client = new MongoClient(process.env.MONGODB_URI as string)
      await client.connect()

      const db = client.db("raffily")

      // Delete session
      await db.collection("sessions").deleteOne({ id: sessionId })
    }

    // Clear session cookie
    cookies().delete("session_id")

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during logout",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  } finally {
    // Make sure to close the MongoDB connection
    if (client) {
      await client.close()
    }
  }
}
