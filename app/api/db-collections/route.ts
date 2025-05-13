import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("raffily")

    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    return NextResponse.json({
      status: "success",
      collections: collectionNames,
    })
  } catch (error) {
    console.error("Error fetching collections:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch collections",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

