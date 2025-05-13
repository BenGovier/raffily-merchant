"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserCredits } from "@/lib/credits-service"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function CreditsSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)

  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (user) {
      loadUserCredits()
    }
  }, [user])

  const loadUserCredits = async () => {
    if (!user) return

    try {
      const userCredits = await getUserCredits(user.id)
      setCredits(userCredits.balance)
    } catch (error) {
      console.error("Error loading user credits:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="text-center">Your SMS credits have been added to your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Thank you for your purchase. Your credits are now available for use in your SMS campaigns.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Balance</p>
              <p className="text-3xl font-bold">{loading ? "..." : credits} credits</p>
            </div>
            {sessionId && <p className="text-xs text-gray-500">Transaction ID: {sessionId}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => router.push("/dashboard/marketing/sms")}>
              Start Sending SMS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard/marketing/sms/credits")}
            >
              View Credits Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

