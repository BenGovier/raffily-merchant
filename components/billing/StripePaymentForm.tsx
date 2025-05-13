"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createSetupIntent } from "@/lib/stripe-client"
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe-config"
import { AlertCircle } from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

// Wrapper component for the Stripe Elements
export function StripePaymentFormWrapper({
  userId,
  onError,
}: {
  userId: string
  onError?: (error: string | null) => void
}) {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm userId={userId} onError={onError} />
    </Elements>
  )
}

// Card Element styles
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
}

// The actual payment form
function StripePaymentForm({
  userId,
  onError,
}: {
  userId: string
  onError?: (error: string | null) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [setupIntentLoading, setSetupIntentLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)

  // Set error in parent component if provided
  useEffect(() => {
    if (onError) {
      onError(error)
    }
  }, [error, onError])

  // Get a setup intent when the component mounts
  useEffect(() => {
    const getSetupIntent = async () => {
      try {
        setSetupIntentLoading(true)
        setError(null)

        console.log("Creating setup intent for user:", userId)
        const response = await createSetupIntent(userId)

        if (!response || !response.clientSecret) {
          throw new Error("Failed to get client secret from server")
        }

        console.log("Setup intent created successfully")
        setClientSecret(response.clientSecret)
      } catch (err: any) {
        console.error("Error getting setup intent:", err)
        setError(err.message || "Failed to initialize payment form. Please try again.")
      } finally {
        setSetupIntentLoading(false)
      }
    }

    if (userId) {
      getSetupIntent()
    }
  }, [userId])

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      setError("Payment system not ready. Please try again.")
      return
    }

    if (!cardComplete) {
      setError("Please complete your card details")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error("Card element not found")
      }

      console.log("Confirming card setup with secret:", clientSecret)

      // Confirm the setup
      const { error: setupError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Raffily Customer",
          },
        },
      })

      if (setupError) {
        throw new Error(setupError.message)
      }

      if (setupIntent.status === "succeeded") {
        setSuccess(true)
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard/settings/billing")
          router.refresh()
        }, 2000)
      } else {
        throw new Error(`Setup failed with status: ${setupIntent.status}. Please try again.`)
      }
    } catch (err: any) {
      console.error("Error in card setup:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete)
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardContent className="p-0">
        {success ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-md">
            Payment method added successfully! Redirecting...
          </div>
        ) : setupIntentLoading ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Initializing payment form...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 border rounded-md">
              <CardElement options={cardElementOptions} onChange={handleCardChange} />
            </div>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="text-xs text-gray-500">
              For testing, use card number: 4242 4242 4242 4242, any future expiration date, and any 3-digit CVC.
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!stripe || loading || success || !cardComplete || !clientSecret}
              className="w-full"
            >
              {loading ? "Processing..." : "Add Payment Method"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
