import { NextResponse } from "next/server"
import Stripe from "stripe"
import { STRIPE_SECRET_KEY, STRIPE_API_VERSION, SMS_CREDIT_PACKAGES } from "@/lib/stripe-config"

// Initialize Stripe with the secret key
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
})

export async function POST(request: Request) {
  try {
    const { packageId, userId } = await request.json()

    if (!packageId || !userId) {
      return NextResponse.json({ error: "Package ID and User ID are required" }, { status: 400 })
    }

    // Find the package
    const creditPackage = SMS_CREDIT_PACKAGES.find((pkg) => pkg.id === packageId)

    if (!creditPackage) {
      return NextResponse.json({ error: "Invalid package ID" }, { status: 400 })
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${creditPackage.name} SMS Credits Package`,
              description: `${creditPackage.credits} SMS credits for your Raffily account`,
            },
            unit_amount: Math.round(creditPackage.price * 100), // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/marketing/sms/credits/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/marketing/sms/credits`,
      metadata: {
        userId,
        packageId,
        credits: creditPackage.credits.toString(),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

