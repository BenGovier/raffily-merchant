import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { BillingService } from "@/lib/billing-service"

export async function GET(request: Request) {
  try {
    // Get the user cookie from the request
    const cookies = request.headers.get("cookie")
    const userCookie = cookies?.split(";").find((c) => c.trim().startsWith("user="))
    let user = null

    if (userCookie) {
      try {
        const decodedCookie = decodeURIComponent(userCookie.split("=")[1])
        user = JSON.parse(decodedCookie)
      } catch (e) {
        console.error("Error parsing user cookie:", e)
      }
    }

    // Check if we have a demo user
    const isDemo = user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")

    // For demo accounts, we'll simulate having a payment method
    if (isDemo) {
      return NextResponse.json({ hasPaymentMethod: true })
    }

    // Get the session
    const session = await getServerSession(authOptions)

    // Check if we have authentication through any method
    if (!session && !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const merchantId = session?.user?.id || user?.id

    if (!merchantId) {
      return NextResponse.json({ error: "Merchant ID not found" }, { status: 400 })
    }

    const hasPaymentMethod = await BillingService.hasPaymentMethod(merchantId)

    return NextResponse.json({ hasPaymentMethod })
  } catch (error) {
    console.error("Error checking payment method:", error)
    return NextResponse.json({ error: "Failed to check payment method" }, { status: 500 })
  }
}

