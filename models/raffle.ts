import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"
import mongoose, { Schema, type Document } from "mongoose"

// MongoDB interface
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
  maxTickets?: number // Add this field
  rules?: string
  termsAndConditions?: string
  image?: string
  imageUrl?: string
  unsplashCredit?: {
    name: string
    username: string
  }
  createdAt: Date
  updatedAt: Date
}

// Mongoose interface
export interface IRaffle extends Document {
  merchantId: mongoose.Types.ObjectId
  title: string
  description: string
  prize: string
  startDate: Date
  endDate: Date
  status: "draft" | "active" | "scheduled" | "completed" | "cancelled"
  entries: number
  maxTickets?: number // Add this field
  rules?: string
  termsAndConditions?: string
  image?: string
  imageUrl?: string
  unsplashCredit?: {
    name: string
    username: string
  }
  createdAt: Date
  updatedAt: Date
}

// MongoDB implementation
export class RaffleModel {
  static async findById(id: string | ObjectId): Promise<Raffle | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("raffles").findOne({ _id }) as Promise<Raffle | null>
  }

  static async findByMerchant(merchantId: string | ObjectId, page = 1, limit = 20): Promise<Raffle[]> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    return db
      .collection("raffles")
      .find({ merchantId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Raffle[]>
  }

  static async create(raffleData: Omit<Raffle, "_id" | "entries" | "createdAt" | "updatedAt">): Promise<Raffle> {
    const db = await getDatabase()

    const now = new Date()
    const newRaffle = {
      ...raffleData,
      entries: 0,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("raffles").insertOne(newRaffle)
    return { ...newRaffle, _id: result.insertedId } as Raffle
  }

  static async update(id: string | ObjectId, raffleData: Partial<Raffle>): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("raffles").updateOne(
      { _id },
      {
        $set: {
          ...raffleData,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  static async updateEntryCount(id: string | ObjectId, increment = 1): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("raffles").updateOne(
      { _id },
      {
        $inc: { entries: increment },
        $set: { updatedAt: new Date() },
      },
    )

    return result.modifiedCount > 0
  }

  static async list(page = 1, limit = 20, status?: Raffle["status"]): Promise<Raffle[]> {
    const db = await getDatabase()
    const query = status ? { status } : {}

    return db
      .collection("raffles")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Raffle[]>
  }

  static async count(merchantId?: string | ObjectId, status?: Raffle["status"]): Promise<number> {
    const db = await getDatabase()

    const query: any = {}
    if (merchantId) {
      const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId
      query.merchantId = id
    }
    if (status) {
      query.status = status
    }

    return db.collection("raffles").countDocuments(query)
  }

  static async getActiveRaffles(): Promise<Raffle[]> {
    const db = await getDatabase()
    const now = new Date()

    return db
      .collection("raffles")
      .find({
        status: "active",
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .sort({ endDate: 1 })
      .toArray() as Promise<Raffle[]>
  }
}

// Mongoose Schema
const RaffleSchema = new Schema(
  {
    merchantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    prize: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "active", "scheduled", "completed", "cancelled"],
      default: "draft",
    },
    entries: { type: Number, default: 0 },
    maxTickets: { type: Number },
    rules: { type: String },
    termsAndConditions: { type: String },
    image: { type: String },
    imageUrl: { type: String },
    unsplashCredit: {
      name: { type: String },
      username: { type: String },
    },
  },
  { timestamps: true },
)

// Mongoose model
const RaffleMongooseModel = mongoose.models.Raffle || mongoose.model<IRaffle>("Raffle", RaffleSchema)

export default RaffleMongooseModel

// Explicitly export RaffleModel as a named export to fix the deployment error
