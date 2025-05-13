import { NextResponse } from "next/server"
import Stripe from "stripe"
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe-config"
import { BillingService } from "@/lib/billing-service"

// Initialize Stripe with the secret key
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") as string

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  try {
    // Handle the event
    switch (event.type) {
      case "setup_intent.succeeded":
        const setupIntent = event.data.object as Stripe.SetupIntent

        // Get the payment method details
        const paymentMethod = await stripe.paymentMethods.retrieve(setupIntent.payment_method as string)

        // Add the payment method to the database
        if (setupIntent.metadata?.userId) {
          await BillingService.addPaymentMethod(
            setupIntent.metadata.userId,
            paymentMethod.id,
            paymentMethod.card?.brand || "unknown",
            paymentMethod.card?.last4 || "0000",
            paymentMethod.card?.exp_month || 1,
            paymentMethod.card?.exp_year || 2025,
            true, // Set as default
          )
        }
        break

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update the invoice status if this was for an invoice payment
        if (paymentIntent.metadata?.invoiceId) {
          await BillingService.markInvoiceAsPaid(paymentIntent.metadata.invoiceId)
        }
        break

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent

        // Update the invoice status if this was for an invoice payment
        if (failedPaymentIntent.metadata?.invoiceId) {
          await BillingService.markInvoiceAsFailed(failedPaymentIntent.metadata.invoiceId)
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(`Error processing webhook: ${err}`)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

// Disable body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
}
