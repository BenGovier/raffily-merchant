import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/db-init"

export async function GET() {
  try {
    const result = await initializeDatabase()

    if (result.success) {
      return NextResponse.json({
        status: "success",
        message: result.message,
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: result.message,
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in db-setup API route:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

