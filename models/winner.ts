import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"

export interface Winner {
  _id?: ObjectId
  raffleId: ObjectId
  entryId: ObjectId
  selectionMethod: "random" | "manual"
  notified?: boolean
  notifiedAt?: Date
  claimed?: boolean
  claimedAt?: Date
  prize?: string
  createdAt: Date
  updatedAt: Date
}

export class WinnerModel {
  static async findById(id: string | ObjectId): Promise<Winner | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("winners").findOne({ _id }) as Promise<Winner | null>
  }

  static async findByEntryId(entryId: string | ObjectId): Promise<Winner | null> {
    const db = await getDatabase()
    const id = typeof entryId === "string" ? new ObjectId(entryId) : entryId
    return db.collection("winners").findOne({ entryId: id }) as Promise<Winner | null>
  }

  static async findByRaffle(raffleId: string | ObjectId, page = 1, limit = 100): Promise<Winner[]> {
    const db = await getDatabase()
    const id = typeof raffleId === "string" ? new ObjectId(raffleId) : raffleId

    return db
      .collection("winners")
      .find({ raffleId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Winner[]>
  }

  static async find(query: any, page = 1, limit = 20): Promise<Winner[]> {
    const db = await getDatabase()

    return db
      .collection("winners")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Winner[]>
  }

  static async count(query: any): Promise<number> {
    const db = await getDatabase()
    return db.collection("winners").countDocuments(query)
  }

  static async create(winnerData: Omit<Winner, "_id" | "createdAt" | "updatedAt">): Promise<Winner> {
    const db = await getDatabase()

    const now = new Date()
    const newWinner = {
      ...winnerData,
      notified: false,
      claimed: false,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("winners").insertOne(newWinner)
    return { ...newWinner, _id: result.insertedId } as Winner
  }

  static async update(id: string | ObjectId, updates: Partial<Winner>): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("winners").updateOne(
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

    const result = await db.collection("winners").deleteOne({ _id })
    return result.deletedCount > 0
  }

  static async markAsNotified(id: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("winners").updateOne(
      { _id },
      {
        $set: {
          notified: true,
          notifiedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  static async markAsClaimed(id: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("winners").updateOne(
      { _id },
      {
        $set: {
          claimed: true,
          claimedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }
}

