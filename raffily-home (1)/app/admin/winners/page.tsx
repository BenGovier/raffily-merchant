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
  Eye,
  Filter,
  Gift,
  MoreHorizontal,
  Search,
  Trophy,
  User,
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

// Mock data for winners
const mockWinners = [
  {
    id: "w001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    raffleId: "r001",
    raffleName: "Summer Promotion",
    merchant: "Acme Corporation",
    merchantId: "m001",
    prize: "MacBook Pro",
    winDate: "2023-08-15",
    claimed: true,
    claimDate: "2023-08-16",
  },
  {
    id: "w002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    raffleId: "r005",
    raffleName: "Spring Promotion",
    merchant: "Sunset Hotels",
    merchantId: "m004",
    prize: "Weekend Getaway",
    winDate: "2023-05-22",
    claimed: true,
    claimDate: "2023-05-23",
  },
  {
    id: "w003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    raffleId: "r006",
    raffleName: "Member Rewards",
    merchant: "Fitness First",
    merchantId: "m006",
    prize: "1-Year Membership",
    winDate: "2023-07-31",
    claimed: true,
    claimDate: "2023-08-02",
  },
  {
    id: "w004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    raffleId: "r009",
    raffleName: "Holiday Giveaway",
    merchant: "Global Retail",
    merchantId: "m002",
    prize: "Smart Home Bundle",
    winDate: "2023-08-05",
    claimed: false,
  },
  {
    id: "w005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 876-5432",
    raffleId: "r010",
    raffleName: "Anniversary Special",
    merchant: "Gourmet Delights",
    merchantId: "m007",
    prize: "Dinner for Two",
    winDate: "2023-08-10",
    claimed: false,
  },
]

export default function AdminWinnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTab, setCurrentTab] = useState("all")

  const filteredWinners = mockWinners.filter((winner) => {
    const matchesSearch =
      winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.raffleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.prize.toLowerCase().includes(searchTerm.toLowerCase())

    if (currentTab === "all") return matchesSearch
    if (currentTab === "claimed") return matchesSearch && winner.claimed
    if (currentTab === "unclaimed") return matchesSearch && !winner.claimed

    return matchesSearch
  })

  const claimedCount = mockWinners.filter((w) => w.claimed).length
  const unclaimedCount = mockWinners.filter((w) => !w.claimed).length
  const claimRate = ((claimedCount / mockWinners.length) * 100).toFixed(0)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Winners</h1>
          <p className="text-gray-500">Manage and track all raffle winners</p>
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
            <CardTitle className="text-sm font-medium text-gray-500">Total Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockWinners.length}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-500">+3</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Claimed Prizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{claimedCount}</div>
            <p className="text-sm text-gray-500 mt-1">{claimRate}% claim rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unclaimed Prizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{unclaimedCount}</div>
            <p className="text-sm text-gray-500 mt-1">Pending claim</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search winners..."
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
            <TabsTrigger value="all">All Winners</TabsTrigger>
            <TabsTrigger value="claimed">Claimed</TabsTrigger>
            <TabsTrigger value="unclaimed">Unclaimed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Winner</TableHead>
                <TableHead>Raffle</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Prize</TableHead>
                <TableHead>Win Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWinners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No winners found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredWinners.map((winner) => (
                  <TableRow key={winner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">{winner.name}</div>
                          <div className="text-sm text-gray-500">{winner.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/raffles/${winner.raffleId}`} className="text-blue-600 hover:underline">
                        {winner.raffleName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/merchants/${winner.merchantId}`} className="text-blue-600 hover:underline">
                        {winner.merchant}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 text-purple-500 mr-2" />
                        {winner.prize}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(winner.winDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {winner.claimed ? (
                        <Badge className="bg-green-500">Claimed</Badge>
                      ) : (
                        <Badge className="bg-yellow-500">Unclaimed</Badge>
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="h-4 w-4 mr-2" />
                            Contact Winner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {!winner.claimed && (
                            <DropdownMenuItem className="text-green-600">
                              <Trophy className="h-4 w-4 mr-2" />
                              Mark as Claimed
                            </DropdownMenuItem>
                          )}
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
            Showing {filteredWinners.length} of {mockWinners.length} winners
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

