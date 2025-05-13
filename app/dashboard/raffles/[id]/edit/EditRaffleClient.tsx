"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
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

export default function EditRaffleClient() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        setLoading(true)
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
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRaffle((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!raffle) return

    try {
      setSaving(true)
      setError(null)

      const response = await fetch(`/api/raffles/${raffle._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raffle),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update raffle")
      }

      router.push("/dashboard/raffles")
    } catch (err: any) {
      console.error("Error updating raffle:", err)
      setError(err.message || "An error occurred while updating the raffle")
      setSaving(false)
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
      <h1 className="text-2xl font-bold mb-6">Edit Raffle</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Raffle Details</CardTitle>
            <CardDescription>Update your raffle information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={raffle.title} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={raffle.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="prize">Prize</Label>
              <Input id="prize" name="prize" value={raffle.prize} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={new Date(raffle.startDate).toISOString().split("T")[0]}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={new Date(raffle.endDate).toISOString().split("T")[0]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={raffle.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/raffles")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

