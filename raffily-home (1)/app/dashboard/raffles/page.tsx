"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Calendar,
  Clock,
  Eye,
  Plus,
  Search,
  Ticket,
  Trophy,
  Users,
  MoreHorizontal,
  Edit,
  Trash,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for raffles
const mockRaffles = [
  {
    id: "raffle-001",
    title: "Summer Promotion",
    prize: "MacBook Pro",
    startDate: "2023-07-15T00:00:00Z",
    endDate: "2023-08-15T23:59:59Z",
    entries: 342,
    status: "completed",
    hasWinner: true,
  },
  {
    id: "raffle-002",
    title: "Customer Appreciation",
    prize: "$500 Gift Card",
    startDate: "2023-08-01T00:00:00Z",
    endDate: "2023-08-22T23:59:59Z",
    entries: 214,
    status: "active",
  },
  {
    id: "raffle-003",
    title: "Fall Giveaway",
    prize: "iPhone 14",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    entries: 0,
    status: "scheduled",
  },
  {
    id: "raffle-004",
    title: "Holiday Special",
    prize: "Weekend Getaway",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-25T23:59:59Z",
    entries: 0,
    status: "draft",
  },
  {
    id: "raffle-005",
    title: "New Year Celebration",
    prize: "Smart TV",
    startDate: "2023-12-26T00:00:00Z",
    endDate: "2024-01-10T23:59:59Z",
    entries: 0,
    status: "pending",
  },
]

export default function RafflesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [raffles, setRaffles] = useState(mockRaffles)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, fetch the raffles from your API
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredRaffles = (status: string) => {
    return raffles
      .filter((raffle) => raffle.status === status)
      .filter(
        (raffle) =>
          raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          raffle.prize.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      case "scheduled":
        return <Badge className="bg-purple-500">Scheduled</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending Approval</Badge>
      default:
        return null
    }
  }

  const handleDeleteRaffle = (id: string) => {
    if (confirm("Are you sure you want to delete this raffle?")) {
      setRaffles(raffles.filter((raffle) => raffle.id !== id))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Raffles</h1>
          <p className="text-gray-500">Manage and track all your raffles</p>
        </div>
        <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90" asChild>
          <Link href="/dashboard/raffles/new">
            <Plus className="h-4 w-4 mr-2" />
            Create New Raffle
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search raffles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        {["active", "completed", "scheduled", "draft", "pending"].map((status) => (
          <TabsContent key={status} value={status}>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B8A9]"></div>
              </div>
            ) : filteredRaffles(status).length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No {status} raffles found</h3>
                <p className="text-gray-500 mb-6">
                  {status === "active" && "You don't have any active raffles at the moment."}
                  {status === "completed" && "You haven't completed any raffles yet."}
                  {status === "scheduled" && "You don't have any scheduled raffles."}
                  {status === "draft" && "You don't have any draft raffles."}
                  {status === "pending" && "You don't have any raffles pending approval."}
                </p>
                {status !== "completed" && (
                  <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90" asChild>
                    <Link href="/dashboard/raffles/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Raffle
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRaffles(status).map((raffle) => (
                  <Card key={raffle.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-lg">{raffle.title}</h3>
                            {getStatusBadge(raffle.status)}
                          </div>
                          <p className="text-gray-500 mb-4">Prize: {raffle.prize}</p>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <p className="text-xs text-gray-500">Start Date</p>
                                <p className="text-sm">{new Date(raffle.startDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <div>
                                <p className="text-xs text-gray-500">End Date</p>
                                <p className="text-sm">{new Date(raffle.endDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{raffle.entries} entries</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 flex flex-col justify-center items-center md:w-48">
                          <div className="space-y-3 w-full">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full">
                                  <MoreHorizontal className="h-4 w-4 mr-2" />
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuLabel>Manage Raffle</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/raffles/${raffle.id}`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/raffles/${raffle.id}/edit`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Raffle
                                  </Link>
                                </DropdownMenuItem>
                                {raffle.status === "completed" && (
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/dashboard/raffles/${raffle.id}/winners`}
                                      className="cursor-pointer flex items-center"
                                    >
                                      <Trophy className="h-4 w-4 mr-2" />
                                      {raffle.hasWinner ? "View Winner" : "Draw Winner"}
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 cursor-pointer flex items-center"
                                  onClick={() => handleDeleteRaffle(raffle.id)}
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete Raffle
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {raffle.status === "completed" && (
                              <Button
                                className={`w-full ${raffle.hasWinner ? "bg-[#00B8A9] hover:bg-[#00B8A9]/90" : "bg-blue-500 hover:bg-blue-600"}`}
                                asChild
                              >
                                <Link href={`/dashboard/raffles/${raffle.id}/winners`}>
                                  {raffle.hasWinner ? (
                                    <>
                                      <Trophy className="h-4 w-4 mr-2" />
                                      View Winner
                                    </>
                                  ) : (
                                    <>
                                      <Award className="h-4 w-4 mr-2" />
                                      Draw Winner
                                    </>
                                  )}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

