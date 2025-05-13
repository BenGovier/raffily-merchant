import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { EntryModel } from "@/models/entry"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const raffleId = searchParams.get("raffleId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    if (!raffleId) {
      return NextResponse.json({ error: "Raffle ID is required" }, { status: 400 })
    }

    const entries = await EntryModel.findByRaffle(raffleId, page, limit)
    const total = await EntryModel.count({ raffleId: new ObjectId(raffleId) })

    return NextResponse.json({
      entries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching entries:", error)
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const data = await request.json()

    // Generate a ticket number
    const ticketNumber = await EntryModel.generateTicketNumber()

    // Create the entry
    const entry = await EntryModel.create({
      raffleId: new ObjectId(data.raffleId),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile || "",
      address: data.address || "",
      ticketNumber,
      answers: data.answers || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ entry })
  } catch (error) {
    console.error("Error creating entry:", error)
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 })
  }
}

