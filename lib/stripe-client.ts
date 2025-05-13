import { loadStripe } from "@stripe/stripe-js"
import { STRIPE_PUBLISHABLE_KEY } from "./stripe-config"

// Initialize Stripe with the publishable key
let stripePromise: Promise<any> | null = null

export const getStripe = () => {
  if (!stripePromise && STRIPE_PUBLISHABLE_KEY) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

// Create a checkout session for SMS credits
export const createCheckoutSession = async (packageId: string, userId: string) => {
  try {
    const response = await fetch("/api/payments/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packageId,
        userId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(errorData.error || `HTTP error ${response.status}`)
    }

    const data = await response.json()

    if (!data.sessionId) {
      throw new Error("Invalid response from server: missing sessionId")
    }

    const stripe = await getStripe()

    if (!stripe) {
      throw new Error("Failed to initialize Stripe")
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })

    if (error) {
      console.error("Error redirecting to checkout:", error)
      throw new Error(error.message)
    }
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

// Create a setup intent for adding a payment method
export const createSetupIntent = async (userId: string) => {
  try {
    console.log(`Requesting setup intent for user: ${userId}`)

    if (!userId) {
      throw new Error("User ID is required")
    }

    const response = await fetch("/api/billing/create-setup-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    })

    console.log(`Setup intent API response status: ${response.status}`)

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`

      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
        console.error("Setup intent error details:", errorData)
      } catch (e) {
        console.error("Could not parse error response:", e)
      }

      throw new Error(`Failed to create setup intent: ${errorMessage}`)
    }

    const data = await response.json()

    if (!data.clientSecret) {
      console.error("Invalid setup intent response:", data)
      throw new Error("Invalid response from server: missing clientSecret")
    }

    return data
  } catch (error: any) {
    console.error("Error creating setup intent:", error)
    throw error
  }
}

