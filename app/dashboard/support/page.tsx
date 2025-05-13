"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Ticket {
  _id: string
  subject: string
  urgency: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved" | "closed"
  category: string
  createdAt: string
  updatedAt: string
  responses: Array<{
    message: string
    isAdmin: boolean
    createdAt: string
  }>
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/tickets")
      if (!response.ok) {
        throw new Error("Failed to fetch tickets")
      }
      const data = await response.json()
      setTickets(data.tickets)
      setError(null)
    } catch (err) {
      setError("Failed to load support tickets. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

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

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchTickets} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => router.push("/dashboard/support/new")}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Support Tickets</CardTitle>
          <CardDescription>View and manage your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B8A9]"></div>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">You haven't created any support tickets yet.</p>
              <Button onClick={() => router.push("/dashboard/support/new")}>Create Your First Ticket</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket._id}>
                      <TableCell className="font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status.replace("-", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyColor(ticket.urgency)}>{ticket.urgency}</Badge>
                      </TableCell>
                      <TableCell>{ticket.category.replace("-", " ")}</TableCell>
                      <TableCell>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</TableCell>
                      <TableCell>{ticket.responses.length}</TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => router.push(`/dashboard/support/${ticket._id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
