import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  let client
  try {
    const { name, email, password } = await request.json()
    console.log("Registration attempt for:", email) // Debug log

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required",
        },
        { status: 400 },
      )
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB") // Debug log
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()
    console.log("MongoDB connected") // Debug log

    const db = client.db("raffily")
    const usersCollection = db.collection("users")

    // Check if user already exists - case insensitive search
    const existingUser = await usersCollection.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists",
        },
        { status: 409 },
      )
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const userId = uuidv4()
    const newUser = {
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "merchant",
      createdAt: new Date().toISOString(),
    }

    await usersCollection.insertOne(newUser)
    console.log("User created:", userId) // Debug log

    // Create session
    const sessionId = uuidv4()
    const session = {
      id: sessionId,
      userId,
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
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
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

