import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET() {
  try {
    // Get MongoDB URI from environment variable
    const uri = process.env.MONGODB_URI

    if (!uri) {
      return NextResponse.json(
        {
          success: false,
          message: "MongoDB URI is not defined in environment variables",
        },
        { status: 500 },
      )
    }

    // Create a new MongoClient
    const client = new MongoClient(uri)

    // Connect to the MongoDB server
    await client.connect()

    // Ping the database to confirm connection
    await client.db("admin").command({ ping: 1 })

    // Get list of databases to verify access
    const dbs = await client.db().admin().listDatabases()

    // Close the connection
    await client.close()

    return NextResponse.json({
      success: true,
      message: "Successfully connected to MongoDB",
      databases: dbs.databases.map((db) => db.name),
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to MongoDB",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

