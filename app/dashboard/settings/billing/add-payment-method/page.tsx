import { Suspense } from "react"
import { StripePaymentFormWrapper } from "@/components/billing/StripePaymentForm"
import { getCurrentUser } from "@/lib/auth-utils"

export default async function AddPaymentMethodPage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">You must be logged in to access this page.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add Payment Method</h1>

      <Suspense fallback={<div>Loading payment form...</div>}>
        <StripePaymentFormWrapper userId={user.id} />
      </Suspense>

      <div className="mt-8 text-sm text-gray-500">
        <p>Your payment information is securely processed by Stripe.</p>
        <p>Raffily does not store your full card details.</p>
      </div>
    </div>
  )
}
