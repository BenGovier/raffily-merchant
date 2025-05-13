import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db-init"
import Ticket from "@/models/ticket"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import mongoose from "mongoose"

// Helper function to check if user is a demo account
function isDemoAccount(email: string | undefined | null) {
  if (!email) return false
  return email.includes("demo") || email === "demo@example.com" || email === "ben@raffily.com" || email.includes("test")
}

// GET /api/tickets - Get all tickets for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const userEmail = session.user.email
    const isAdmin = session.user.role === "admin"
    const isDemo = isDemoAccount(userEmail)

    // Parse query parameters
    const url = new URL(req.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const status = url.searchParams.get("status")

    const skip = (page - 1) * limit

    // For demo accounts, return mock data
    if (isDemo) {
      // Get demo tickets from localStorage if available (client-side only)
      let demoTickets = []

      // Generate some mock tickets
      const mockTickets = [
        {
          _id: "demo-ticket-1",
          subject: "How do I customize my raffle page?",
          description: "I want to add my company logo and colors to the raffle page.",
          urgency: "medium",
          category: "technical",
          status: status || "open",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          userId: userId,
          responses: [
            {
              userId: "admin-user-id",
              isAdmin: true,
              message:
                "You can customize your raffle page in the Settings section. Go to Dashboard > Settings > Branding.",
              createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            },
          ],
        },
        {
          _id: "demo-ticket-2",
          subject: "Payment processing issue",
          description: "I'm having trouble connecting my payment processor.",
          urgency: "high",
          category: "billing",
          status: "in-progress",
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          userId: userId,
          responses: [],
        },
      ]

      // Filter by status if provided
      const filteredTickets = status ? mockTickets.filter((ticket) => ticket.status === status) : mockTickets

      // Combine with any stored tickets
      demoTickets = [...filteredTickets, ...demoTickets]

      // Apply pagination
      const paginatedTickets = demoTickets.slice(skip, skip + limit)

      return NextResponse.json(
        {
          tickets: paginatedTickets,
          pagination: {
            total: demoTickets.length,
            page,
            limit,
            pages: Math.ceil(demoTickets.length / limit),
          },
        },
        {
          headers: {
            "Cache-Control": "private, no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    }

    // For real accounts, connect to database
    await connectToDatabase()

    // Build query
    const query: any = isAdmin ? {} : { userId: new mongoose.Types.ObjectId(userId) }

    if (status && ["open", "in-progress", "resolved", "closed"].includes(status)) {
      query.status = status
    }

    // Get tickets with pagination
    const tickets = await Ticket.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email company")
      .lean()

    // Get total count for pagination
    const total = await Ticket.countDocuments(query)

    return NextResponse.json(
      {
        tickets,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching tickets:", error)
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

// POST /api/tickets - Create a new ticket
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const userEmail = session.user.email
    const isDemo = isDemoAccount(userEmail)

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // Validate required fields
    if (!body.subject || !body.description) {
      return NextResponse.json({ error: "Subject and description are required" }, { status: 400 })
    }

    // Validate urgency
    if (body.urgency && !["low", "medium", "high", "critical"].includes(body.urgency)) {
      return NextResponse.json({ error: "Invalid urgency level" }, { status: 400 })
    }

    // Validate category
    if (
      body.category &&
      !["account", "billing", "technical", "feature-request", "raffle", "other"].includes(body.category)
    ) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // For demo accounts, return success without database operation
    if (isDemo) {
      // Create a mock ticket response
      const mockTicket = {
        _id: `demo-ticket-${Date.now()}`,
        userId,
        subject: body.subject,
        description: body.description,
        urgency: body.urgency || "medium",
        category: body.category || "other",
        status: "open",
        responses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return NextResponse.json(
        { ticket: mockTicket },
        {
          status: 201,
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
          },
        },
      )
    }

    // For real accounts, connect to database
    await connectToDatabase()

    // Create new ticket
    const ticket = new Ticket({
      userId: new mongoose.Types.ObjectId(userId),
      subject: body.subject,
      description: body.description,
      urgency: body.urgency || "medium",
      category: body.category || "other",
      status: "open",
      responses: [],
    })

    await ticket.save()

    return NextResponse.json(
      { ticket },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error creating ticket:", error)
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}

