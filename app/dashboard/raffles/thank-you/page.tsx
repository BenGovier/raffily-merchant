"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const newRaffle = searchParams.get("newRaffle")

  useEffect(() => {
    // If we have new raffle data, pass it to the raffles page
    if (newRaffle) {
      setTimeout(() => {
        router.push(`/dashboard/raffles?newRaffle=${newRaffle}`)
      }, 5000)
    } else {
      setTimeout(() => {
        router.push("/dashboard/raffles")
      }, 5000)
    }
  }, [router, newRaffle])

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Raffle Created Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Your raffle has been submitted for review. Once approved, it will be active and ready to accept entries.
        </p>
        <div className="space-y-4">
          <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90" asChild>
            <Link href="/dashboard/raffles">View All Raffles</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

