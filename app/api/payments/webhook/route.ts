import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { connectToDatabase } from "@/lib/mongodb"
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe-config"

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  try {
    // Handle the event
    switch (event.type) {
      case "setup_intent.succeeded":
        const setupIntent = event.data.object as Stripe.SetupIntent
        await handleSetupIntentSucceeded(setupIntent)
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentIntentSucceeded(paymentIntent)
        break

      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutSessionCompleted(session)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(`Error handling webhook: ${err}`)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

// Handle successful setup intent (adding a payment method)
async function handleSetupIntentSucceeded(setupIntent: Stripe.SetupIntent) {
  if (!setupIntent.metadata?.userId) {
    console.log("No user ID in setup intent metadata")
    return
  }

  try {
    await connectToDatabase()

    // Update user record to indicate they have a payment method
    // This depends on your user model structure
    const db = (await connectToDatabase()).db
    await db.collection("users").updateOne(
      { _id: setupIntent.metadata.userId },
      {
        $set: {
          hasPaymentMethod: true,
          stripeCustomerId: setupIntent.customer as string,
          updatedAt: new Date(),
        },
      },
    )

    console.log(`Updated payment method for user: ${setupIntent.metadata.userId}`)
  } catch (error) {
    console.error("Error updating user payment method:", error)
  }
}

// Handle successful payment intent
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  if (!paymentIntent.metadata?.userId) {
    console.log("No user ID in payment intent metadata")
    return
  }

  try {
    // Process the successful payment
    // This would depend on what the payment was for
    console.log(`Payment succeeded for user: ${paymentIntent.metadata.userId}`)
  } catch (error) {
    console.error("Error processing payment:", error)
  }
}

// Handle completed checkout session
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.client_reference_id) {
    console.log("No client reference ID in session")
    return
  }

  try {
    await connectToDatabase()

    // Extract the package ID and user ID from the client reference
    const [userId, packageId] = session.client_reference_id.split("_")

    if (!userId || !packageId) {
      console.log("Invalid client reference ID format")
      return
    }

    // Update user credits based on the package purchased
    // This depends on your credit model structure
    const db = (await connectToDatabase()).db

    // Determine credit amount based on package ID
    let creditAmount = 0
    switch (packageId) {
      case "basic":
        creditAmount = 100
        break
      case "standard":
        creditAmount = 500
        break
      case "premium":
        creditAmount = 1000
        break
      default:
        creditAmount = 0
    }

    if (creditAmount > 0) {
      // Add credits to user account
      await db.collection("credits").insertOne({
        userId,
        amount: creditAmount,
        type: "purchase",
        description: `Purchase of ${packageId} SMS credit package`,
        createdAt: new Date(),
      })

      console.log(`Added ${creditAmount} credits for user: ${userId}`)
    }
  } catch (error) {
    console.error("Error processing checkout session:", error)
  }
}

