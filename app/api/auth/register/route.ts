import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { UserModel } from "@/models/user"
import { getDatabase } from "@/lib/db-init"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, company, country } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create user
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "merchant",
      company,
      country,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create session
    const sessionId = uuidv4()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    const db = await getDatabase()
    await db.collection("sessions").insertOne({
      id: sessionId,
      userId: newUser._id,
      createdAt: new Date(),
      expiresAt,
    })

    // Set session cookie
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during registration",
      },
      { status: 500 },
    )
  }
}
