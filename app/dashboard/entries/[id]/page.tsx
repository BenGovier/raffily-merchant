"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  RefreshCw,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
  Ticket,
} from "lucide-react"
import { format } from "date-fns"

// Dummy data for the raffle
const dummyRaffle = {
  _id: "raffle1",
  title: "Summer Giveaway",
  prize: "MacBook Pro",
  status: "active",
  rules: JSON.stringify([
    { question: "What's your favorite product from our store?", required: true },
    { question: "How did you hear about us?", required: false },
  ]),
}

// Dummy data for entries
const dummyEntries = [
  {
    _id: "entry1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "+1 (555) 123-4567",
    ticketNumber: "12345678",
    createdAt: "2023-06-05T10:30:00Z",
    answers: {
      q1: "The premium coffee maker",
      q2: "From a friend",
    },
  },
  {
    _id: "entry2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    mobile: "+1 (555) 987-6543",
    ticketNumber: "87654321",
    createdAt: "2023-06-06T14:15:00Z",
    answers: {
      q1: "Your organic tea collection",
      q2: "Social media",
    },
  },
  {
    _id: "entry3",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    mobile: "+1 (555) 456-7890",
    ticketNumber: "23456789",
    createdAt: "2023-06-07T09:45:00Z",
    answers: {
      q1: "The espresso machine",
      q2: "Google search",
    },
  },
  {
    _id: "entry4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.w@example.com",
    mobile: "+1 (555) 789-0123",
    ticketNumber: "34567890",
    createdAt: "2023-06-08T16:20:00Z",
    answers: {
      q1: "Your specialty coffee beans",
      q2: "Instagram ad",
    },
  },
  {
    _id: "entry5",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@example.com",
    mobile: "+1 (555) 234-5678",
    ticketNumber: "45678901",
    createdAt: "2023-06-09T11:10:00Z",
    answers: {
      q1: "The coffee grinder",
      q2: "From a colleague",
    },
  },
  {
    _id: "entry6",
    firstName: "Sarah",
    lastName: "Miller",
    email: "sarah.m@example.com",
    mobile: "+1 (555) 345-6789",
    ticketNumber: "56789012",
    createdAt: "2023-06-10T13:25:00Z",
    answers: {
      q1: "Your coffee subscription service",
      q2: "Email newsletter",
    },
  },
  {
    _id: "entry7",
    firstName: "James",
    lastName: "Wilson",
    email: "james.w@example.com",
    mobile: "+1 (555) 456-7890",
    ticketNumber: "67890123",
    createdAt: "2023-06-11T10:05:00Z",
    answers: {
      q1: "The pour-over kit",
      q2: "Facebook ad",
    },
  },
  {
    _id: "entry8",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifer.t@example.com",
    mobile: "+1 (555) 567-8901",
    ticketNumber: "78901234",
    createdAt: "2023-06-12T15:40:00Z",
    answers: {
      q1: "Your cold brew collection",
      q2: "From a family member",
    },
  },
  {
    _id: "entry9",
    firstName: "Robert",
    lastName: "Anderson",
    email: "robert.a@example.com",
    mobile: "+1 (555) 678-9012",
    ticketNumber: "89012345",
    createdAt: "2023-06-13T09:15:00Z",
    answers: {
      q1: "The travel mug",
      q2: "Twitter",
    },
  },
  {
    _id: "entry10",
    firstName: "Lisa",
    lastName: "Thomas",
    email: "lisa.t@example.com",
    mobile: "+1 (555) 789-0123",
    ticketNumber: "90123456",
    createdAt: "2023-06-14T14:30:00Z",
    answers: {
      q1: "Your tea infuser",
      q2: "In-store promotion",
    },
  },
]

export default function RaffleEntriesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [entries, setEntries] = useState(dummyEntries)
  const [raffle, setRaffle] = useState(dummyRaffle)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [questions, setQuestions] = useState<{ question: string; required: boolean }[]>([])

  useEffect(() => {
    // Parse the rules to get questions
    if (raffle.rules) {
      try {
        const parsedRules = JSON.parse(raffle.rules)
        setQuestions(parsedRules)
      } catch (e) {
        console.error("Error parsing raffle rules:", e)
        setQuestions([])
      }
    }
  }, [raffle.rules])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter entries based on search term
    const filtered = dummyEntries.filter(
      (entry) =>
        entry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setEntries(filtered)
  }

  const refreshEntries = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setEntries(dummyEntries)
      setIsLoading(false)
    }, 1000)
  }

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ["First Name", "Last Name", "Email", "Mobile", "Ticket Number", "Date Entered"]

    // Add question headers
    questions.forEach((q, index) => {
      headers.push(`Q${index + 1}: ${q.question}`)
    })

    const csvContent = [
      headers.join(","),
      ...entries.map((entry) => {
        const row = [
          `"${entry.firstName}"`,
          `"${entry.lastName}"`,
          `"${entry.email}"`,
          `"${entry.mobile || ""}"`,
          `"${entry.ticketNumber}"`,
          `"${format(new Date(entry.createdAt), "MMM dd, yyyy HH:mm")}"`,
        ]

        // Add answers
        questions.forEach((_, index) => {
          const answer = entry.answers[`q${index + 1}`] || ""
          row.push(`"${answer}"`)
        })

        return row.join(",")
      }),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${raffle?.title || "raffle"}-entries.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/entries")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{raffle?.title || "Raffle"} Entries</h1>
          {raffle?.status && (
            <Badge className="ml-2">{raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshEntries} variant="outline" className="flex items-center gap-2" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="secondary"
            className="flex items-center gap-2"
            disabled={entries.length === 0}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Entries for {raffle?.title || "Raffle"}</CardTitle>
          <CardDescription>
            View all entries for this raffle. You can search, filter, and export the data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              placeholder="Search by name, email, or ticket number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Ticket Number</TableHead>
                  <TableHead>Date Entered</TableHead>
                  {questions.map((q, index) => (
                    <TableHead key={index}>Q{index + 1} Answer</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7 + questions.length} className="text-center py-10">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Loading entries...</p>
                    </TableCell>
                  </TableRow>
                ) : entries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7 + questions.length} className="text-center py-10">
                      <p className="text-gray-500">No entries found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  entries.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell>{entry.firstName}</TableCell>
                      <TableCell>{entry.lastName}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {entry.email}
                      </TableCell>
                      <TableCell>
                        {entry.mobile ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            {entry.mobile}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Ticket className="h-3.5 w-3.5 text-gray-400" />
                          <span className="font-mono">{entry.ticketNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {format(new Date(entry.createdAt), "MMM dd, yyyy HH:mm")}
                        </div>
                      </TableCell>
                      {questions.map((_, index) => (
                        <TableCell key={index}>{entry.answers[`q${index + 1}`] || "-"}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
