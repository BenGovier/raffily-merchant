"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

// Helper function to check if user is a demo account
function isDemoAccount(email: string | undefined | null) {
  if (!email) return false
  return email.includes("demo") || email === "demo@example.com" || email === "ben@raffily.com" || email.includes("test")
}

export default function NewTicketPage() {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [urgency, setUrgency] = useState("medium")
  const [category, setCategory] = useState("technical")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const isDemo = isDemoAccount(user?.email)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim()) {
      setError("Please enter a subject")
      return
    }

    if (!description.trim()) {
      setError("Please enter a description")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          description,
          urgency,
          category,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create ticket")
      }

      // For demo accounts, store the ticket in localStorage
      if (isDemo) {
        const data = await response.json()
        const demoTicket = data.ticket

        // Store in localStorage
        try {
          const storedTickets = localStorage.getItem("demoTickets")
          const tickets = storedTickets ? JSON.parse(storedTickets) : []
          tickets.push(demoTicket)
          localStorage.setItem("demoTickets", JSON.stringify(tickets))
        } catch (err) {
          console.error("Error storing demo ticket:", err)
        }
      }

      setSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/support")
      }, 1500)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Failed to create ticket")
    } finally {
      setLoading(false)
    }
  }

  // Responsive styles for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>
        <h1 className="text-2xl font-bold">Create Support Ticket</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Support Request</CardTitle>
          <CardDescription>Please provide details about your issue so we can help you more effectively</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your ticket has been created successfully. Redirecting to support page...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief summary of your issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={loading || success}
                className="w-full"
              />
            </div>

            <div className={`${isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}`}>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={urgency} onValueChange={setUrgency} disabled={loading || success}>
                  <SelectTrigger id="urgency" className="w-full">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - No rush</SelectItem>
                    <SelectItem value="medium">Medium - Need help soon</SelectItem>
                    <SelectItem value="high">High - Urgent issue</SelectItem>
                    <SelectItem value="critical">Critical - Business impacted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={loading || success}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="feature-request">Feature Request</SelectItem>
                    <SelectItem value="raffle">Raffle Problem</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide as much detail as possible about your issue"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading || success}
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading || success}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full sm:w-auto bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white"
            >
              {loading ? "Submitting..." : success ? "Submitted!" : "Submit Ticket"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
