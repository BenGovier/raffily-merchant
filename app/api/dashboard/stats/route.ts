import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"

export async function GET(request: Request) {
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

    // Get time range from query params
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "7days"

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()

    const db = client.db("raffily")

    // Find session
    const session = await db.collection("sessions").findOne({ id: sessionId })

    if (!session) {
      await client.close()
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session",
        },
        { status: 401 },
      )
    }

    // Get date range based on timeRange
    const now = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "7days":
        startDate.setDate(now.getDate() - 7)
        break
      case "30days":
        startDate.setDate(now.getDate() - 30)
        break
      case "90days":
        startDate.setDate(now.getDate() - 90)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Get user's raffles
    const raffles = await db.collection("raffles").find({ userId: session.userId }).toArray()

    // Count active and completed raffles
    const activeRaffles = raffles.filter(
      (raffle) => raffle.status === "active" || (raffle.endDate && new Date(raffle.endDate) > now),
    ).length

    const completedRaffles = raffles.filter(
      (raffle) => raffle.status === "completed" || (raffle.endDate && new Date(raffle.endDate) <= now),
    ).length

    // Get analytics data
    const analytics = await db
      .collection("analytics")
      .find({
        userId: session.userId,
        timestamp: { $gte: startDate, $lte: now },
      })
      .toArray()

    // Calculate stats
    const totalViews = analytics.reduce((sum, item) => sum + (item.views || 0), 0)
    const ticketsIssued = analytics.reduce((sum, item) => sum + (item.tickets || 0), 0)
    const questionsAnswered = analytics.reduce((sum, item) => sum + (item.questions || 0), 0)
    const pageClicks = analytics.reduce((sum, item) => sum + (item.clicks || 0), 0)

    await client.close()

    // Return stats
    return NextResponse.json({
      totalViews,
      ticketsIssued,
      questionsAnswered,
      pageClicks,
      activeRaffles,
      completedRaffles,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching dashboard stats",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

