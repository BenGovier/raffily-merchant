import { type NextRequest, NextResponse } from "next/server"
import { UserModel } from "@/models/user"
import { ObjectId } from "mongodb"

// GET a specific merchant
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const merchant = await UserModel.findById(params.id)

    if (!merchant) {
      return NextResponse.json({ error: "Merchant not found" }, { status: 404 })
    }

    // Don't return the password
    const { password, ...merchantWithoutPassword } = merchant

    // Convert MongoDB ObjectId to string
    const id =
      merchantWithoutPassword._id instanceof ObjectId
        ? merchantWithoutPassword._id.toString()
        : merchantWithoutPassword._id

    return NextResponse.json({
      ...merchantWithoutPassword,
      _id: id,
    })
  } catch (error) {
    console.error("Error fetching merchant:", error)
    return NextResponse.json({ error: "Failed to fetch merchant" }, { status: 500 })
  }
}

// PATCH update a merchant
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Update the merchant
    const success = await UserModel.update(params.id, data)

    if (!success) {
      return NextResponse.json({ error: "Merchant not found or update failed" }, { status: 404 })
    }

    // Get the updated merchant
    const updatedMerchant = await UserModel.findById(params.id)

    if (!updatedMerchant) {
      return NextResponse.json({ error: "Failed to retrieve updated merchant" }, { status: 500 })
    }

    // Don't return the password
    const { password, ...merchantWithoutPassword } = updatedMerchant

    // Convert MongoDB ObjectId to string
    const id =
      merchantWithoutPassword._id instanceof ObjectId
        ? merchantWithoutPassword._id.toString()
        : merchantWithoutPassword._id

    return NextResponse.json({
      ...merchantWithoutPassword,
      _id: id,
    })
  } catch (error) {
    console.error("Error updating merchant:", error)
    return NextResponse.json({ error: "Failed to update merchant" }, { status: 500 })
  }
}

// DELETE a merchant
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real application, you might want to:
    // 1. Archive the merchant instead of deleting
    // 2. Delete related data (raffles, entries, etc.)
    // 3. Handle permissions (only admins can delete)

    // For now, we'll just delete the user
    const db = await getDatabase()
    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Merchant not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting merchant:", error)
    return NextResponse.json({ error: "Failed to delete merchant" }, { status: 500 })
  }
}

// Helper function to get the database
async function getDatabase() {
  const { getDatabase } = await import("@/lib/db-init")
  return getDatabase()
}

