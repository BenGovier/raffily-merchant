import { NextResponse } from "next/server"
import { CreditModel } from "@/models/credit"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's credit balance
    const balance = await CreditModel.getBalance(userId)

    return NextResponse.json({
      success: true,
      balance,
    })
  } catch (error) {
    console.error("Error fetching credit balance:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch credit balance" }, { status: 500 })
  }
}
