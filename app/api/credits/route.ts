import { NextResponse } from "next/server"
import { CreditModel } from "@/models/credit"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's credit balance
    const balance = await CreditModel.getBalance(userId)

    // Get transaction history
    const transactions = await CreditModel.getTransactionHistory(userId, page, limit)

    return NextResponse.json({
      success: true,
      balance,
      transactions: transactions.map((t) => ({
        ...t,
        _id: t._id?.toString(),
        merchantId: t.merchantId.toString(),
        createdAt: t.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error("Error fetching credits:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch credits" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, amount, type, transactionId, description, metadata } = await request.json()

    if (!userId || !amount) {
      return NextResponse.json({ error: "User ID and amount are required" }, { status: 400 })
    }

    // Add credits to user's account
    const credit = await CreditModel.addCredits(
      userId,
      amount,
      type || "purchase",
      transactionId,
      description,
      metadata,
    )

    // Get updated balance
    const balance = await CreditModel.getBalance(userId)

    return NextResponse.json({
      success: true,
      credit: {
        ...credit,
        _id: credit._id?.toString(),
        merchantId: credit.merchantId.toString(),
        createdAt: credit.createdAt.toISOString(),
      },
      balance,
    })
  } catch (error) {
    console.error("Error adding credits:", error)
    return NextResponse.json({ success: false, error: "Failed to add credits" }, { status: 500 })
  }
}
