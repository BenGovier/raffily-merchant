import { NextResponse } from "next/server"
import { BillingService } from "@/lib/billing-service"

// This endpoint would be called by a cron job on the 1st of each month
export async function POST(request: Request) {
  try {
    // Verify the request is authorized (e.g., using a secret token)
    const authHeader = request.headers.get("Authorization")
    const expectedToken = process.env.CRON_SECRET_TOKEN

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Run monthly billing
    await BillingService.runMonthlyBilling()

    return NextResponse.json({ success: true, message: "Monthly billing completed" })
  } catch (error) {
    console.error("Error running monthly billing:", error)
    return NextResponse.json({ error: "Failed to run monthly billing" }, { status: 500 })
  }
}

