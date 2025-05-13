// This is a simplified version that won't break the app if MongoDB is unavailable
import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password?: string
  role: "admin" | "merchant"
  createdAt: Date
  updatedAt: Date
}

export interface Raffle {
  _id?: ObjectId
  title: string
  description: string
  prize: string
  startDate: Date
  endDate: Date
  status: "draft" | "active" | "completed" | "cancelled"
  merchantId: ObjectId
  entries: number
  createdAt: Date
  updatedAt: Date
}

export interface Entry {
  _id?: ObjectId
  raffleId: ObjectId
  customerName: string
  customerEmail: string
  customerPhone?: string
  entryDate: Date
  isWinner: boolean
}

export interface Credit {
  _id?: ObjectId
  merchantId: ObjectId
  amount: number
  transactionId?: string
  type: "purchase" | "usage"
  createdAt: Date
}

class DatabaseService {
  private static instance: DatabaseService

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // Safe wrapper for database operations
  private async withDb<T>(operation: (db: any) => Promise<T>, fallback: T): Promise<T> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      return await operation(db)
    } catch (error) {
      console.error("Database operation failed:", error)
      return fallback
    }
  }

  // User operations
  async getUserByEmail(email: string) {
    return this.withDb(async (db) => {
      return await db.collection("users").findOne({ email })
    }, null)
  }

  // Add more methods as needed, all with proper fallbacks

  // Raffle methods
  async getRafflesByMerchantId(merchantId: ObjectId | string): Promise<Raffle[]> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("raffles")
      const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId
      return collection.find({ merchantId: id }).toArray() as Promise<Raffle[]>
    } catch (error) {
      console.error("Database operation failed:", error)
      return []
    }
  }

  async getRaffleById(id: ObjectId | string): Promise<Raffle | null> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("raffles")
      const raffleId = typeof id === "string" ? new ObjectId(id) : id
      return collection.findOne({ _id: raffleId }) as Promise<Raffle | null>
    } catch (error) {
      console.error("Database operation failed:", error)
      return null
    }
  }

  async createRaffle(raffle: Omit<Raffle, "_id">): Promise<Raffle> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("raffles")
      const result = await collection.insertOne({
        ...raffle,
        entries: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { ...raffle, _id: result.insertedId } as Raffle
    } catch (error) {
      console.error("Database operation failed:", error)
      return {} as Raffle
    }
  }

  async updateRaffle(id: ObjectId | string, update: Partial<Raffle>): Promise<boolean> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("raffles")
      const raffleId = typeof id === "string" ? new ObjectId(id) : id
      const result = await collection.updateOne({ _id: raffleId }, { $set: { ...update, updatedAt: new Date() } })
      return result.modifiedCount > 0
    } catch (error) {
      console.error("Database operation failed:", error)
      return false
    }
  }

  async createUser(user: Omit<User, "_id">): Promise<User> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("users")
      const result = await collection.insertOne({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { ...user, _id: result.insertedId } as User
    } catch (error) {
      console.error("Database operation failed:", error)
      return {} as User
    }
  }

  // Entry methods
  async createEntry(entry: Omit<Entry, "_id">): Promise<Entry> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("entries")
      const result = await collection.insertOne({
        ...entry,
        isWinner: false,
        entryDate: new Date(),
      })

      // Update raffle entries count
      const rafflesCollection = db.collection("raffles")
      await rafflesCollection.updateOne({ _id: entry.raffleId }, { $inc: { entries: 1 } })

      return { ...entry, _id: result.insertedId } as Entry
    } catch (error) {
      console.error("Database operation failed:", error)
      return {} as Entry
    }
  }

  async getEntriesByRaffleId(raffleId: ObjectId | string): Promise<Entry[]> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("entries")
      const id = typeof raffleId === "string" ? new ObjectId(raffleId) : raffleId
      return collection.find({ raffleId: id }).toArray() as Promise<Entry[]>
    } catch (error) {
      console.error("Database operation failed:", error)
      return []
    }
  }

  // Credit methods
  async getMerchantCredits(merchantId: ObjectId | string): Promise<number> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("credits")
      const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

      const credits = await collection.find({ merchantId: id }).toArray()

      return credits.reduce((total, credit) => {
        if (credit.type === "purchase") {
          return total + credit.amount
        } else {
          return total - credit.amount
        }
      }, 0)
    } catch (error) {
      console.error("Database operation failed:", error)
      return 0
    }
  }

  async addCredits(merchantId: ObjectId | string, amount: number, transactionId?: string): Promise<void> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const collection = db.collection("credits")
      const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

      await collection.insertOne({
        merchantId: id,
        amount,
        transactionId,
        type: "purchase",
        createdAt: new Date(),
      })
    } catch (error) {
      console.error("Database operation failed:", error)
    }
  }

  async useCredits(merchantId: ObjectId | string, amount: number): Promise<boolean> {
    try {
      const client = await clientPromise
      const db = client.db("raffily")
      const currentCredits = await this.getMerchantCredits(merchantId)

      if (currentCredits < amount) {
        return false
      }

      const collection = db.collection("credits")
      const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

      await collection.insertOne({
        merchantId: id,
        amount,
        type: "usage",
        createdAt: new Date(),
      })

      return true
    } catch (error) {
      console.error("Database operation failed:", error)
      return false
    }
  }
}

export default DatabaseService.getInstance()

