"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

interface SimplePaymentFormProps {
  userId: string
  onSuccess?: () => void
  onError?: (error: string | null) => void
}

export function SimplePaymentForm({ userId, onSuccess, onError }: SimplePaymentFormProps) {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Basic validation
    if (!cardNumber.trim()) {
      setLocalError("Card number is required")
      return
    }

    if (!expiry.trim()) {
      setLocalError("Expiration date is required")
      return
    }

    if (!cvc.trim()) {
      setLocalError("CVC is required")
      return
    }

    // For demo/testing purposes, accept any card number that passes basic validation
    const isTestCard = cardNumber.replace(/\s+/g, "") === "4242424242424242"

    if (!isTestCard && !validateCardNumber(cardNumber)) {
      setLocalError("Invalid card number")
      return
    }

    setLoading(true)
    setLocalError(null)

    try {
      // Simulate API call for adding payment method
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, always succeed with test card
      if (isTestCard) {
        setSuccess(true)

        // Store payment method in localStorage for demo purposes
        localStorage.setItem("hasPaymentMethod", "true")
        localStorage.setItem("paymentMethodAdded", "true")

        // Notify parent of success
        if (onSuccess) {
          setTimeout(() => {
            onSuccess()
          }, 1000)
        }

        // Refresh the page after a delay
        setTimeout(() => {
          router.refresh()
        }, 1500)
      } else {
        throw new Error("Invalid card details. Please use the test card number.")
      }
    } catch (err: any) {
      setLocalError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Set error locally and propagate to parent if needed
  const setLocalError = (message: string | null) => {
    setError(message)
    if (onError) {
      onError(message)
    }
  }

  // Basic card number validation (Luhn algorithm)
  const validateCardNumber = (number: string) => {
    const regex = /^[0-9]{16}$/
    if (!regex.test(number.replace(/\s+/g, ""))) {
      return false
    }

    return true // Simplified for demo
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none">
      <CardContent className="p-0">
        {success ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Payment method added successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123"
                    maxLength={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
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

            <Button type="submit" onClick={handleSubmit} disabled={loading || success} className="w-full">
              {loading ? "Processing..." : "Add Payment Method"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
