"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, Send, User } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TicketResponse {
  _id: string
  userId: {
    _id: string
    name: string
  }
  isAdmin: boolean
  message: string
  createdAt: string
}

interface Ticket {
  _id: string
  subject: string
  description: string
  urgency: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved" | "closed"
  category: string
  createdAt: string
  updatedAt: string
  userId: {
    _id: string
    name: string
    email: string
    company: string
  }
  responses: TicketResponse[]
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [urgency, setUrgency] = useState<string>("")
  const router = useRouter()
  const { user } = useAuth()

  const fetchTicket = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/tickets/${params.id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch ticket")
      }
      const data = await response.json()
      setTicket(data.ticket)
      setUrgency(data.ticket.urgency)
      setError(null)
    } catch (err) {
      setError("Failed to load ticket details. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTicket()
  }, [params.id])

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!response.trim()) {
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/tickets/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response,
          urgency,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit response")
      }

      const data = await res.json()
      setTicket(data.ticket)
      setResponse("")
    } catch (err) {
      console.error(err)
      setError("Failed to submit your response. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-purple-100 text-purple-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateUrgency = async (newUrgency: string) => {
    try {
      const res = await fetch(`/api/tickets/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urgency: newUrgency,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to update urgency")
      }

      const data = await res.json()
      setTicket(data.ticket)
      setUrgency(newUrgency)
    } catch (err) {
      console.error(err)
      setError("Failed to update urgency. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B8A9]"></div>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>

        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Ticket not found"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/support")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </Button>
        <h1 className="text-2xl font-bold">Ticket: {ticket.subject}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
              <CardDescription>Created {format(new Date(ticket.createdAt), "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{ticket.description}</p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Conversation</h3>

                  {ticket.responses.length === 0 ? (
                    <p className="text-gray-500 italic">No responses yet</p>
                  ) : (
                    <div className="space-y-4">
                      {ticket.responses.map((resp, index) => (
                        <div
                          key={resp._id || index}
                          className={`p-4 rounded-md ${
                            resp.isAdmin
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : "bg-gray-50 border-l-4 border-gray-300"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <User className="h-4 w-4 mr-2" />
                            <span className="font-medium">{resp.isAdmin ? "Support Team" : "You"}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm text-gray-500">{format(new Date(resp.createdAt), "PPp")}</span>
                          </div>
                          <p className="whitespace-pre-wrap">{resp.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {ticket.status !== "closed" && (
                  <form onSubmit={handleSubmitResponse} className="border-t pt-4">
                    <h3 className="font-medium mb-2">Add Response</h3>
                    <Textarea
                      placeholder="Type your message here..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      rows={4}
                      className="mb-4"
                    />
                    <Button type="submit" disabled={submitting || !response.trim()} className="flex items-center">
                      {submitting ? "Sending..." : "Send Response"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("-", " ")}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Urgency</p>
                  <div className="flex items-center">
                    <Badge className={getUrgencyColor(ticket.urgency)}>{ticket.urgency}</Badge>

                    {ticket.status !== "closed" && (
                      <div className="ml-2">
                        <Select value={urgency} onValueChange={updateUrgency}>
                          <SelectTrigger className="w-[120px] h-7 text-xs">
                            <SelectValue placeholder="Change" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p>{ticket.category.replace("-", " ")}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Ticket ID</p>
                  <p className="text-xs font-mono">{ticket._id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p>{format(new Date(ticket.createdAt), "PPp")}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p>{format(new Date(ticket.updatedAt), "PPp")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
