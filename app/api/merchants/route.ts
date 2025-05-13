import { type NextRequest, NextResponse } from "next/server"
import { UserModel } from "@/models/user"
import { ObjectId } from "mongodb"

// GET all merchants
export async function GET(request: NextRequest) {
  try {
    // Fetch all users with role "merchant"
    const merchants = await UserModel.list(1, 100, "merchant")

    // Transform the data to be safe for the client
    const safeData = merchants.map((merchant) => {
      // Convert MongoDB ObjectId to string
      const id = merchant._id instanceof ObjectId ? merchant._id.toString() : merchant._id

      // Remove password and return the rest
      const { password, ...rest } = merchant

      return {
        ...rest,
        _id: id,
      }
    })

    return NextResponse.json(safeData)
  } catch (error) {
    console.error("Error fetching merchants:", error)
    return NextResponse.json({ error: "Failed to fetch merchants" }, { status: 500 })
  }
}

// POST create a new merchant
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(data.email)

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create the user with role "merchant"
    const user = await UserModel.create({
      ...data,
      role: "merchant",
    })

    // Don't return the password
    const { password, ...userWithoutPassword } = user

    // Convert MongoDB _id to string
    const id =
      userWithoutPassword._id instanceof ObjectId ? userWithoutPassword._id.toString() : userWithoutPassword._id

    return NextResponse.json(
      {
        ...userWithoutPassword,
        _id: id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating merchant:", error)
    return NextResponse.json({ error: "Failed to create merchant" }, { status: 500 })
  }
}

