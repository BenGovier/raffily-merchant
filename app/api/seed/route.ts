import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

// This route is for seeding the database with initial data
export async function GET(request: Request) {
  // Check for a secret token to prevent unauthorized seeding
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (token !== process.env.CRON_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let client
  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI as string)
    await client.connect()

    const db = client.db("raffily")

    // Create demo and admin users if they don't exist
    const usersCollection = db.collection("users")

    // Demo user
    const demoUserExists = await usersCollection.findOne({ email: "demo@raffily.com" })
    if (!demoUserExists) {
      const hashedPassword = await bcrypt.hash("raffily2024", 10)
      await usersCollection.insertOne({
        id: uuidv4(),
        name: "Demo User",
        email: "demo@raffily.com",
        password: hashedPassword,
        businessName: "Demo Business",
        role: "merchant",
        createdAt: new Date().toISOString(),
        isDemo: true,
      })
    }

    // Admin user
    const adminUserExists = await usersCollection.findOne({ email: "admin@raffily.com" })
    if (!adminUserExists) {
      const hashedPassword = await bcrypt.hash("admin2024", 10)
      await usersCollection.insertOne({
        id: uuidv4(),
        name: "Admin User",
        email: "admin@raffily.com",
        password: hashedPassword,
        businessName: "Raffily Admin",
        role: "admin",
        createdAt: new Date().toISOString(),
        isDemo: false,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Seeding error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during database seeding",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  } finally {
    if (client) {
      await client.close()
    }
  }
}
