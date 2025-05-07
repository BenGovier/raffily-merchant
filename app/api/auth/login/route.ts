import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  let client
  try {
    const { email, password } = await request.json()
    console.log("Login request for email:", email)

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    console.log("MongoDB connected")

    const db = client.db("raffily")
    const usersCollection = db.collection("users")

    // Find user - case insensitive search
    const user = await usersCollection.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    })

    if (!user) {
      console.log("User not found")
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      console.log("Invalid password")
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Create session
    const sessionId = uuidv4()
    const session = {
      id: sessionId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    }

    await db.collection("sessions").insertOne(session)
    console.log("Session created:", sessionId)

    // Set session cookie
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  } finally {
    // Make sure to close the MongoDB connection
    if (client) {
      await client.close()
      console.log("MongoDB connection closed")
    }
  }
}
