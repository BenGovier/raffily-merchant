"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  Calendar,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Ticket,
  Trash,
  Trophy,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for raffles
const mockRaffles = [
  {
    id: "r001",
    title: "Summer Promotion",
    merchant: "Acme Corporation",
    merchantId: "m001",
    prize: "MacBook Pro",
    entries: 342,
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    status: "completed",
    winner: "john.doe@example.com",
    url: "https://raffily.com/r/summer-promotion",
  },
  {
    id: "r002",
    title: "Customer Appreciation",
    merchant: "Global Retail",
    merchantId: "m002",
    prize: "$500 Gift Card",
    entries: 214,
    startDate: "2023-08-01",
    endDate: "2023-08-22",
    status: "active",
    url: "https://raffily.com/r/customer-appreciation",
  },
  {
    id: "r003",
    title: "Back to School",
    merchant: "City Bank",
    merchantId: "m003",
    prize: "iPad Air",
    entries: 156,
    startDate: "2023-08-10",
    endDate: "2023-09-10",
    status: "active",
    url: "https://raffily.com/r/back-to-school",
  },
  {
    id: "r004",
    title: "Fall Giveaway",
    merchant: "Tech Innovations",
    merchantId: "m005",
    prize: "iPhone 14",
    entries: 0,
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    status: "scheduled",
    url: "https://raffily.com/r/fall-giveaway",
  },
  {
    id: "r005",
    title: "Spring Promotion",
    merchant: "Sunset Hotels",
    merchantId: "m004",
    prize: "Weekend Getaway",
    entries: 189,
    startDate: "2023-05-01",
    endDate: "2023-05-22",
    status: "completed",
    winner: "jane.smith@example.com",
    url: "https://raffily.com/r/spring-promotion",
  },
  {
    id: "r006",
    title: "Member Rewards",
    merchant: "Fitness First",
    merchantId: "m006",
    prize: "1-Year Membership",
    entries: 98,
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    status: "completed",
    winner: "mike.johnson@example.com",
    url: "https://raffily.com/r/member-rewards",
  },
  {
    id: "r007",
    title: "Holiday Special",
    merchant: "Gourmet Delights",
    merchantId: "m007",
    prize: "Dinner for Two",
    entries: 0,
    startDate: "2023-12-01",
    endDate: "2023-12-25",
    status: "draft",
    url: "https://raffily.com/r/holiday-special",
  },
  {
    id: "r008",
    title: "New Year Celebration",
    merchant: "Global Retail",
    merchantId: "m002",
    prize: "Smart TV",
    entries: 0,
    startDate: "2023-12-26",
    endDate: "2024-01-10",
    status: "pending",
    url: "https://raffily.com/r/new-year-celebration",
  },
]

export default function AdminRafflesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [raffles, setRaffles] = useState(mockRaffles)

  const filteredRaffles = raffles.filter((raffle) => {
    const matchesSearch =
      raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      raffle.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      raffle.prize.toLowerCase().includes(searchTerm.toLowerCase())

    if (currentTab === "all") return matchesSearch
    return matchesSearch && raffle.status === currentTab
  })

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

  const handleApproveRaffle = (id: string) => {
    setRaffles(raffles.map((raffle) => (raffle.id === id ? { ...raffle, status: "active" } : raffle)))
  }

  const handleRejectRaffle = (id: string) => {
    if (confirm("Are you sure you want to reject this raffle?")) {
      setRaffles(raffles.map((raffle) => (raffle.id === id ? { ...raffle, status: "draft" } : raffle)))
    }
  }

  const activeCount = raffles.filter((r) => r.status === "active").length
  const completedCount = raffles.filter((r) => r.status === "completed").length
  const totalEntries = raffles.reduce((acc, raffle) => acc + raffle.entries, 0)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Raffles</h1>
          <p className="text-gray-500">Manage all raffles across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Raffles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{raffles.length}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-500">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Raffles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeCount}</div>
            <p className="text-sm text-gray-500 mt-1">
              {((activeCount / raffles.length) * 100).toFixed(0)}% of total raffles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEntries}</div>
            <p className="text-sm text-gray-500 mt-1">Across all raffles</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search raffles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="p-4" onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">All Raffles</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raffle</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entries</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRaffles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No raffles found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRaffles.map((raffle) => (
                  <TableRow key={raffle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{raffle.title}</div>
                        <div className="text-sm text-gray-500">Prize: {raffle.prize}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/merchants/${raffle.merchantId}`} className="text-blue-600 hover:underline">
                        {raffle.merchant}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {raffle.url ? (
                        <a
                          href={raffle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm truncate block max-w-[200px]"
                        >
                          {raffle.url}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(raffle.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        {raffle.entries}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-xs text-gray-500">
                            Start: {new Date(raffle.startDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            End: {new Date(raffle.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {raffle.status === "completed" ? (
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm truncate max-w-[120px]">{raffle.winner}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/raffles/${raffle.id}`} className="cursor-pointer flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/raffles/${raffle.id}/edit`}
                              className="cursor-pointer flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Raffle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {raffle.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                className="text-green-600 cursor-pointer"
                                onClick={() => handleApproveRaffle(raffle.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleRejectRaffle(raffle.id)}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDeleteRaffle(raffle.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredRaffles.length} of {raffles.length} raffles
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
