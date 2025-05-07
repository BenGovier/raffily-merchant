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

// GET /api/tickets/[id] - Get a specific ticket
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const userEmail = session.user.email
    const isAdmin = session.user.role === "admin"
    const isDemo = isDemoAccount(userEmail)
    const ticketId = params.id

    // For demo accounts, return mock data
    if (isDemo || ticketId.startsWith("demo-")) {
      // Create a mock ticket
      const mockTicket = {
        _id: ticketId,
        subject: "How do I customize my raffle page?",
        description: "I want to add my company logo and colors to the raffle page.",
        urgency: "medium",
        category: "technical",
        status: "open",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        userId: {
          _id: userId,
          name: "Demo User",
          email: userEmail || "demo@example.com",
          company: "Demo Company",
        },
        responses: [
          {
            _id: "demo-response-1",
            userId: "admin-user-id",
            isAdmin: true,
            message:
              "You can customize your raffle page in the Settings section. Go to Dashboard > Settings > Branding.",
            createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          },
        ],
      }

      return NextResponse.json(
        { ticket: mockTicket },
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

    // Find the ticket
    const ticket = await Ticket.findById(ticketId).populate("userId", "name email company").lean()

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check if user has permission to view this ticket
    if (!isAdmin && ticket.userId._id.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(
      { ticket },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching ticket:", error)
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

// PATCH /api/tickets/[id] - Update a ticket
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const userEmail = session.user.email
    const isAdmin = session.user.role === "admin"
    const isDemo = isDemoAccount(userEmail)
    const ticketId = params.id

    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    // For demo accounts, return success without database operation
    if (isDemo || ticketId.startsWith("demo-")) {
      // Create a mock updated ticket
      const mockTicket = {
        _id: ticketId,
        subject: body.subject || "How do I customize my raffle page?",
        description: body.description || "I want to add my company logo and colors to the raffle page.",
        urgency: body.urgency || "medium",
        category: body.category || "technical",
        status: body.status || "open",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date().toISOString(), // now
        userId: {
          _id: userId,
          name: "Demo User",
          email: userEmail || "demo@example.com",
          company: "Demo Company",
        },
        responses: body.newResponse
          ? [
              {
                _id: "demo-response-1",
                userId: "admin-user-id",
                isAdmin: true,
                message:
                  "You can customize your raffle page in the Settings section. Go to Dashboard > Settings > Branding.",
                createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
              },
              {
                _id: `demo-response-${Date.now()}`,
                userId: userId,
                isAdmin: false,
                message: body.newResponse,
                createdAt: new Date().toISOString(),
              },
            ]
          : [
              {
                _id: "demo-response-1",
                userId: "admin-user-id",
                isAdmin: true,
                message:
                  "You can customize your raffle page in the Settings section. Go to Dashboard > Settings > Branding.",
                createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
              },
            ],
      }

      return NextResponse.json(
        { ticket: mockTicket },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json",
          },
        },
      )
    }

    // For real accounts, connect to database
    await connectToDatabase()

    // Find the ticket
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check if user has permission to update this ticket
    if (!isAdmin && ticket.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Update fields if provided
    if (body.subject) ticket.subject = body.subject
    if (body.description) ticket.description = body.description
    if (body.urgency && ["low", "medium", "high", "critical"].includes(body.urgency)) {
      ticket.urgency = body.urgency
    }
    if (
      body.category &&
      ["account", "billing", "technical", "feature-request", "raffle", "other"].includes(body.category)
    ) {
      ticket.category = body.category
    }
    if (isAdmin && body.status && ["open", "in-progress", "resolved", "closed"].includes(body.status)) {
      ticket.status = body.status
    }

    // Add a new response if provided
    if (body.newResponse) {
      ticket.responses.push({
        userId: new mongoose.Types.ObjectId(userId),
        isAdmin: isAdmin,
        message: body.newResponse,
        createdAt: new Date(),
      })
    }

    // Update the updatedAt timestamp
    ticket.updatedAt = new Date()

    await ticket.save()

    // Populate user info for the response
    const updatedTicket = await Ticket.findById(ticketId).populate("userId", "name email company").lean()

    return NextResponse.json(
      { ticket: updatedTicket },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error updating ticket:", error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}

// DELETE /api/tickets/[id] - Delete a ticket (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isAdmin = session.user.role === "admin"

    // Only admins can delete tickets
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const ticketId = params.id

    // Validate ticket ID
    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return NextResponse.json({ error: "Invalid ticket ID" }, { status: 400 })
    }

    // Delete ticket
    const result = await Ticket.findByIdAndDelete(ticketId)

    if (!result) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting ticket:", error)
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 })
  }
}
