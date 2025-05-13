import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  console.warn("No MONGODB_URI environment variable found. MongoDB functionality will be limited.")
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/raffily"
const options = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
      console.error("Failed to connect to MongoDB:", err)
      // Return a client that's not connected but won't break the app
      return client
    })
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect().catch((err) => {
    console.error("Failed to connect to MongoDB:", err)
    // Return a client that's not connected but won't break the app
    return client
  })
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

import type { Db } from "mongodb"

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("raffily")
}

// Add the connectToDatabase function to fix the deployment error
export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("raffily")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to the database:", error)
    throw error
  }
}

