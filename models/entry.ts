import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"

export interface Entry {
  _id?: ObjectId
  raffleId: ObjectId
  firstName: string
  lastName: string
  email: string
  mobile?: string
  address?: string
  ticketNumber: string
  answers: Record<string, string> // Store question answers
  createdAt: Date
  updatedAt: Date
}

export class EntryModel {
  static async findById(id: string | ObjectId): Promise<Entry | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("entries").findOne({ _id }) as Promise<Entry | null>
  }

  static async findByEmail(email: string, raffleId?: string | ObjectId): Promise<Entry | null> {
    const db = await getDatabase()
    const query: any = { email }

    if (raffleId) {
      query.raffleId = typeof raffleId === "string" ? new ObjectId(raffleId) : raffleId
    }

    return db.collection("entries").findOne(query) as Promise<Entry | null>
  }

  static async findByRaffle(raffleId: string | ObjectId, page = 1, limit = 100): Promise<Entry[]> {
    const db = await getDatabase()
    const id = typeof raffleId === "string" ? new ObjectId(raffleId) : raffleId

    return db
      .collection("entries")
      .find({ raffleId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Entry[]>
  }

  static async find(query: any, page = 1, limit = 20): Promise<Entry[]> {
    const db = await getDatabase()

    return db
      .collection("entries")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Entry[]>
  }

  static async count(query: any): Promise<number> {
    const db = await getDatabase()
    return db.collection("entries").countDocuments(query)
  }

  static async create(entryData: Omit<Entry, "_id" | "createdAt" | "updatedAt">): Promise<Entry> {
    const db = await getDatabase()

    const now = new Date()
    const newEntry = {
      ...entryData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("entries").insertOne(newEntry)
    return { ...newEntry, _id: result.insertedId } as Entry
  }

  static async update(id: string | ObjectId, updates: Partial<Entry>): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("entries").updateOne(
      { _id },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  static async delete(id: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("entries").deleteOne({ _id })
    return result.deletedCount > 0
  }

  static async generateTicketNumber(): Promise<string> {
    // Generate a unique ticket number
    const prefix = "RF"
    const randomPart = Math.floor(10000000 + Math.random() * 90000000).toString()
    return `${prefix}${randomPart}`
  }
}
