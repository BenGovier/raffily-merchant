import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  let client
  try {
    const { email, password } = await request.json()
    console.log("Login attempt for:", email) // Debug log

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

    // Special handling for demo account
    if (email.toLowerCase() === "demo@example.com" && password === "password") {
      console.log("Demo login successful") // Debug log

      // Create a demo user object
      const demoUser = {
        id: "demo-user-id",
        email: "demo@example.com",
        name: "Demo User",
        role: "merchant",
        createdAt: new Date().toISOString(),
      }

      // Create session for demo user
      const sessionId = uuidv4()

      // Connect to MongoDB
      client = new MongoClient(process.env.MONGODB_URI as string)
      await client.connect()
      console.log("MongoDB connected for demo user") // Debug log

      const db = client.db("raffily")

      // Store session in database
      const session = {
        id: sessionId,
        userId: demoUser.id,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      }

      await db.collection("sessions").insertOne(session)
      console.log("Demo session created:", sessionId) // Debug log

      // Set session cookie
      cookies().set("session_id", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        sameSite: "lax",
      })

      return NextResponse.json({
        success: true,
        message: "Demo login successful",
        user: demoUser,
      })
    }

    // Regular user authentication flow
    console.log("Connecting to MongoDB for regular login") // Debug log

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    console.log("MongoDB connected for regular login") // Debug log

    const db = client.db("raffily")
    const usersCollection = db.collection("users")

    // Find user - case insensitive search
    const user = await usersCollection.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    })

    console.log("User found:", user ? "Yes" : "No") // Debug log

    if (!user) {
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
    console.log("Password valid:", isPasswordValid) // Debug log

    if (!isPasswordValid) {
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

    // Use the correct user ID field - could be id or _id
    const userId = user.id || (user._id ? user._id.toString() : null)

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found",
        },
        { status: 500 },
      )
    }

    const session = {
      id: sessionId,
      userId: userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    }

    await db.collection("sessions").insertOne(session)
    console.log("Session created:", sessionId) // Debug log

    // Set session cookie
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
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
    }
  }
}

