"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Raffle {
  _id: string
  title: string
  description: string
  prize: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "completed" | "draft"
  entries: number
  merchantId: string
  rules?: string
  termsAndConditions?: string
  image?: string
}

const mockRaffles = [
  {
    id: "raffle-1",
    title: "Demo Raffle 1",
    prize: "A brand new car!",
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    status: "active",
    entries: 50,
  },
  {
    id: "raffle-2",
    title: "Demo Raffle 2",
    prize: "A trip to Hawaii!",
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString(),
    status: "scheduled",
    entries: 10,
  },
]

export default function RaffleDetails() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        setLoading(true)

        // Check if user is a demo account
        const isDemo =
          user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")

        if (isDemo && params.id.startsWith("raffle-")) {
          // For demo accounts with mock raffle IDs, use mock data
          const mockRaffle = mockRaffles.find((r) => r.id === params.id)
          if (mockRaffle) {
            setRaffle({
              _id: mockRaffle.id,
              title: mockRaffle.title,
              description: "This is a demo raffle description.",
              prize: mockRaffle.prize,
              startDate: mockRaffle.startDate,
              endDate: mockRaffle.endDate,
              status: mockRaffle.status,
              entries: mockRaffle.entries,
              merchantId: user?.id || "demo",
              rules: JSON.stringify([
                { question: "What's your favorite product?", required: true },
                { question: "How did you hear about us?", required: false },
              ]),
              termsAndConditions: "Standard terms and conditions apply.",
            })
            setLoading(false)
            return
          }
        }

        // For real accounts or if demo raffle not found, fetch from API
        const response = await fetch(`/api/raffles/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch raffle")
        }

        const data = await response.json()
        setRaffle(data)
      } catch (err: any) {
        console.error("Error fetching raffle:", err)
        setError(err.message || "An error occurred while fetching the raffle")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchRaffle()
    }
  }, [params.id, user])

  const handleDeleteRaffle = async () => {
    if (!raffle) return

    if (!confirm("Are you sure you want to delete this raffle?")) {
      return
    }

    try {
      const response = await fetch(`/api/raffles/${raffle._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete raffle")
      }

      router.push("/dashboard/raffles")
    } catch (err: any) {
      console.error("Error deleting raffle:", err)
      alert(err.message || "An error occurred while deleting the raffle")
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading raffle details...</p>
        </div>
      </div>
    )
  }

  if (error && !raffle) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
        <Button onClick={() => router.push("/dashboard/raffles")} className="mt-4">
          Back to Raffles
        </Button>
      </div>
    )
  }

  if (!raffle) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <p className="text-gray-500">Raffle not found</p>
          <Button onClick={() => router.push("/dashboard/raffles")} className="mt-4">
            Back to Raffles
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{raffle.title}</h1>
        <div className="flex space-x-2">
          <Link href={`/dashboard/raffles/${raffle._id}/edit`}>
            <Button variant="outline" className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="outline" className="text-red-600" onClick={handleDeleteRaffle}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                raffle.status === "active"
                  ? "bg-green-500"
                  : raffle.status === "scheduled"
                    ? "bg-blue-500"
                    : raffle.status === "completed"
                      ? "bg-gray-500"
                      : "bg-yellow-500"
              }
            >
              {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Entries</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Users className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-2xl font-bold">{raffle.entries}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Duration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <div className="text-sm">
                {new Date(raffle.startDate).toLocaleDateString()} - {new Date(raffle.endDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500">
                {Math.ceil(
                  (new Date(raffle.endDate).getTime() - new Date(raffle.startDate).getTime()) / (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Raffle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Prize</h3>
                <p>{raffle.prize}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p>{raffle.description}</p>
              </div>

              {raffle.rules && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Data Capture Questions</h3>
                  <div className="mt-2">
                    {(() => {
                      try {
                        const questions = JSON.parse(raffle.rules)
                        return (
                          <ul className="list-disc pl-5 space-y-1">
                            {questions.map((q: any, i: number) => (
                              <li key={i} className="text-sm">
                                {q.question} {q.required ? "(Required)" : "(Optional)"}
                              </li>
                            ))}
                          </ul>
                        )
                      } catch (e) {
                        return <p className="text-sm text-gray-500">No questions defined</p>
                      }
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href={`/dashboard/raffles/${raffle._id}/entries`}>
                <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">View Entries</Button>
              </Link>

              {raffle.status === "completed" && (
                <Link href={`/dashboard/raffles/${raffle._id}/winners`}>
                  <Button className="w-full">View Winners</Button>
                </Link>
              )}

              {raffle.status === "active" && (
                <Button className="w-full" variant="outline">
                  Share Raffle
                </Button>
              )}

              {raffle.status === "draft" && (
                <Button
                  className="w-full"
                  onClick={async () => {
                    try {
                      await fetch(`/api/raffles/${raffle._id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          ...raffle,
                          status: "active",
                        }),
                      })

                      // Refresh the page to show updated status
                      window.location.reload()
                    } catch (err) {
                      console.error("Error activating raffle:", err)
                      alert("Failed to activate raffle")
                    }
                  }}
                >
                  Activate Raffle
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
