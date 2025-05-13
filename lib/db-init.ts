import type { Db } from "mongodb"
import clientPromise from "./mongodb"
import mongoose from "mongoose"

// MongoDB client connection for direct MongoDB operations
export async function initializeDatabase() {
  try {
    console.log("Starting database initialization...")
    const client = await clientPromise
    const db = client.db("raffily")

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    // Users collection
    if (!collectionNames.includes("users")) {
      await db.createCollection("users")
      await db.collection("users").createIndex({ email: 1 }, { unique: true })
      console.log("Created users collection with email index")
    }

    // Raffles collection
    if (!collectionNames.includes("raffles")) {
      await db.createCollection("raffles")
      await db.collection("raffles").createIndex({ merchantId: 1 })
      await db.collection("raffles").createIndex({ status: 1 })
      await db.collection("raffles").createIndex({ endDate: 1 })
      console.log("Created raffles collection with indexes")
    }

    // Entries collection
    if (!collectionNames.includes("entries")) {
      await db.createCollection("entries")
      await db.collection("entries").createIndex({ raffleId: 1 })
      await db.collection("entries").createIndex({ customerEmail: 1 })
      await db.collection("entries").createIndex({ isWinner: 1 })
      console.log("Created entries collection with indexes")
    }

    // Credits collection
    if (!collectionNames.includes("credits")) {
      await db.createCollection("credits")
      await db.collection("credits").createIndex({ merchantId: 1 })
      await db.collection("credits").createIndex({ type: 1 })
      await db.collection("credits").createIndex({ createdAt: 1 })
      console.log("Created credits collection with indexes")
    }

    // Support tickets collection
    if (!collectionNames.includes("tickets")) {
      await db.createCollection("tickets")
      await db.collection("tickets").createIndex({ merchantId: 1 })
      await db.collection("tickets").createIndex({ status: 1 })
      await db.collection("tickets").createIndex({ urgency: 1 })
      await db.collection("tickets").createIndex({ createdAt: 1 })
      console.log("Created tickets collection with indexes")
    }

    console.log("Database initialization completed successfully")
    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Database initialization failed:", error)
    return { success: false, message: "Database initialization failed", error }
  }
}

// Function to get a reference to the database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("raffily")
}

// Mongoose connection for schema-based operations (if needed)
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

