import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"
import { parse } from "date-fns"

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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "weekly"
    const raffleId = searchParams.get("raffleId") || "all"
    const fromDate = searchParams.get("from")
    const toDate = searchParams.get("to")

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

    // Build query
    const query: any = { userId: session.userId }

    // Add date range if provided
    if (fromDate && toDate) {
      query.date = {
        $gte: parse(fromDate, "yyyy-MM-dd", new Date()),
        $lte: parse(toDate, "yyyy-MM-dd", new Date()),
      }
    }

    // Add raffle filter if not 'all'
    if (raffleId !== "all") {
      query.raffleId = raffleId
    }

    // Get analytics data
    const analyticsCollection = db.collection("analytics")
    let analyticsData = []

    if (timeframe === "weekly") {
      // Group by day of week for weekly view
      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: { $dayOfWeek: "$date" },
            views: { $sum: "$views" },
            tickets: { $sum: "$tickets" },
            questions: { $sum: "$questions" },
            clicks: { $sum: "$clicks" },
          },
        },
        { $sort: { _id: 1 } },
      ]

      const result = await analyticsCollection.aggregate(pipeline).toArray()

      // Map day numbers to day names
      const dayMap = {
        1: "Sun",
        2: "Mon",
        3: "Tue",
        4: "Wed",
        5: "Thu",
        6: "Fri",
        7: "Sat",
      }

      analyticsData = result.map((item) => ({
        name: dayMap[item._id],
        views: item.views,
        tickets: item.tickets,
        questions: item.questions,
        clicks: item.clicks,
      }))
    } else {
      // Group by month for monthly view
      const pipeline = [
        { $match: query },
        {
          $group: {
            _id: { $month: "$date" },
            views: { $sum: "$views" },
            tickets: { $sum: "$tickets" },
            questions: { $sum: "$questions" },
            clicks: { $sum: "$clicks" },
          },
        },
        { $sort: { _id: 1 } },
      ]

      const result = await analyticsCollection.aggregate(pipeline).toArray()

      // Map month numbers to month names
      const monthMap = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      }

      analyticsData = result.map((item) => ({
        name: monthMap[item._id],
        views: item.views,
        tickets: item.tickets,
        questions: item.questions,
        clicks: item.clicks,
      }))
    }

    await client.close()

    // Return analytics data
    return NextResponse.json({
      success: true,
      analytics: analyticsData,
    })
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching analytics data",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

