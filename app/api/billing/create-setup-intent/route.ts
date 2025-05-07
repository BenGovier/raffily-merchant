import { NextResponse } from "next/server"
import Stripe from "stripe"
import { STRIPE_SECRET_KEY, STRIPE_API_VERSION } from "@/lib/stripe-config"

// Initialize Stripe with the secret key
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
})

export async function POST(request: Request) {
  try {
    // Get the user ID from the request body
    const body = await request.json().catch(() => ({}))
    const userId = body.userId

    if (!userId) {
      console.error("Create setup intent error: No userId provided")
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    console.log(`Creating setup intent for user: ${userId}`)

    // Check if Stripe is properly initialized
    if (!stripe) {
      console.error("Create setup intent error: Stripe not initialized")
      return NextResponse.json({ error: "Payment system not available" }, { status: 500 })
    }

    // Verify Stripe API key is set
    if (!STRIPE_SECRET_KEY) {
      console.error("Create setup intent error: Missing Stripe secret key")
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 })
    }

    // Create a SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
      metadata: {
        userId,
      },
    })

    console.log(`Setup intent created successfully: ${setupIntent.id}`)

    // Return the client secret
    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    })
  } catch (error: any) {
    console.error("Error creating setup intent:", error)

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to create setup intent",
        message: error.message,
        type: error.type,
        code: error.code,
      },
      { status: 500 },
    )
  }
}
