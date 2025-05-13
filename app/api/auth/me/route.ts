import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { cookies } from "next/headers"

export async function GET() {
  let client
  try {
    const sessionId = cookies().get("session_id")?.value
    console.log("Checking auth with session ID:", sessionId ? "Present" : "Not present") // Debug log

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
    console.log("Connecting to MongoDB") // Debug log
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    console.log("MongoDB connected") // Debug log

    const db = client.db("raffily")
    const sessionsCollection = db.collection("sessions")

    // Find session
    const session = await sessionsCollection.findOne({ id: sessionId })
    console.log("Session found:", session ? "Yes" : "No") // Debug log

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
      await sessionsCollection.deleteOne({ id: sessionId })
      console.log("Session expired") // Debug log
      return NextResponse.json(
        {
          success: false,
          message: "Session expired",
        },
        { status: 401 },
      )
    }

    // Special handling for demo user
    if (session.userId === "demo-user-id") {
      console.log("Demo user session") // Debug log
      const demoUser = {
        id: "demo-user-id",
        email: "demo@example.com",
        name: "Demo User",
        role: "merchant",
        createdAt: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        user: demoUser,
      })
    }

    const usersCollection = db.collection("users")

    // Try to find user with the ID as is (for id field)
    let user = await usersCollection.findOne({ id: session.userId })
    console.log("User found by id:", user ? "Yes" : "No") // Debug log

    // If not found, try with ObjectId (for _id field)
    if (!user) {
      try {
        user = await usersCollection.findOne({ _id: new ObjectId(session.userId) })
        console.log("User found by _id:", user ? "Yes" : "No") // Debug log
      } catch (error) {
        // Invalid ObjectId format, ignore this error
        console.log("Invalid ObjectId format") // Debug log
      }
    }

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
      },
      { status: 500 },
    )
  } finally {
    if (client) {
      await client.close()
    }
  }
}

