"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Download, Eye, Gift, MoreHorizontal, Search, Trophy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
    prizeSent: false,
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
    prizeSent: true,
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
    prizeSent: false,
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
    prizeSent: false,
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
    prizeSent: false,
  },
]

export default function AdminWinnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [winners, setWinners] = useState(mockWinners)
  const [showDetails, setShowDetails] = useState({})

  const toggleDetails = (id: string) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredWinners = winners.filter((winner) => {
    const matchesSearch =
      winner.raffleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.prize.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleMarkPrizeSent = (id: string) => {
    setWinners(winners.map((winner) => (winner.id === id ? { ...winner, prizeSent: true } : winner)))
  }

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
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raffle</TableHead>
                <TableHead>Prize</TableHead>
                <TableHead>Win Date</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead>Contact</TableHead>
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
                      <div className="font-medium">{winner.raffleName}</div>
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
                      <div className="font-medium">{winner.name}</div>
                      <div className="text-sm text-gray-500">{winner.email}</div>
                    </TableCell>
                    <TableCell>
                      {showDetails[winner.id] ? (
                        <>
                          <div>{winner.name}</div>
                          <div>{winner.phone}</div>
                        </>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => toggleDetails(winner.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {winner.prizeSent ? (
                        <Badge className="bg-green-500">Prize Sent</Badge>
                      ) : (
                        <Badge className="bg-yellow-500">Pending</Badge>
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
                          <DropdownMenuItem onClick={() => handleMarkPrizeSent(winner.id)}>
                            <Trophy className="h-4 w-4 mr-2" />
                            Mark Prize Sent
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
            Showing {filteredWinners.length} of {winners.length} winners
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

