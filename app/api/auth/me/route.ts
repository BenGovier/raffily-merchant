import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"

export async function GET() {
  let client
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
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()

    const db = client.db("raffily")

    // Find session
    const session = await db.collection("sessions").findOne({ id: sessionId })

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 },
      )
    }

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      // Delete expired session
      await db.collection("sessions").deleteOne({ id: sessionId })

      // Clear session cookie
      cookies().delete("session_id")

      return NextResponse.json(
        {
          success: false,
          message: "Session expired",
        },
        { status: 401 },
      )
    }

    // Find user
    const user = await db.collection("users").findOne({ id: session.userId })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during authentication check",
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
