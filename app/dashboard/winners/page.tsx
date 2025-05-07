"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Download, Eye, Gift, Mail, Search, Trophy } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Mock data for winners
const mockWinners = [
  {
    id: "w001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    raffleId: "r001",
    raffleName: "Summer Promotion",
    prize: "MacBook Pro",
    winDate: "2023-08-15",
    claimed: true,
    claimDate: "2023-08-16",
    notified: true,
    notificationDate: "2023-08-15",
  },
  {
    id: "w002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    raffleId: "r005",
    raffleName: "Spring Promotion",
    prize: "Weekend Getaway",
    winDate: "2023-05-22",
    claimed: true,
    claimDate: "2023-05-23",
    notified: true,
    notificationDate: "2023-05-22",
  },
  {
    id: "w003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    raffleId: "r006",
    raffleName: "Member Rewards",
    prize: "1-Year Membership",
    winDate: "2023-07-31",
    claimed: true,
    claimDate: "2023-08-02",
    notified: true,
    notificationDate: "2023-07-31",
  },
  {
    id: "w004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    raffleId: "r009",
    raffleName: "Holiday Giveaway",
    prize: "Smart Home Bundle",
    winDate: "2023-08-05",
    claimed: false,
    notified: true,
    notificationDate: "2023-08-05",
  },
  {
    id: "w005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 876-5432",
    raffleId: "r010",
    raffleName: "Anniversary Special",
    prize: "Dinner for Two",
    winDate: "2023-08-10",
    claimed: false,
    notified: false,
  },
]

export default function MerchantWinnersPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [winners, setWinners] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to check if user is a demo account
  const isDemoAccount = (user) => {
    const demoEmails = ["demo@example.com", "ben@raffily.com"]
    return demoEmails.includes(user?.email) || (user?.id && typeof user.id === "string" && user.id.includes("demo"))
  }

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        if (!user) {
          setWinners([])
          setIsLoading(false)
          return
        }

        if (isDemoAccount(user)) {
          // For demo accounts, use mock data
          console.log("Using mock data for demo account")
          setWinners(mockWinners)
        } else {
          // For real merchant accounts, fetch from API
          // In a real implementation, this would be an API call
          // For now, we'll set an empty array to show no winners for real accounts
          console.log("Real merchant account - should fetch from API")
          setWinners([])

          // Uncomment and implement when API is ready:
          // const response = await fetch('/api/winners');
          // if (response.ok) {
          //   const data = await response.json();
          //   setWinners(data);
          // } else {
          //   console.error('Failed to fetch winners');
          //   setWinners([]);
          // }
        }
      } catch (error) {
        console.error("Error fetching winners:", error)
        setWinners([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWinners()
  }, [user])

  const filteredWinners = winners.filter((winner) => {
    const matchesSearch =
      winner.raffleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.prize.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleNotifyWinner = (id) => {
    // In a real app, you would call your API to send a notification
    setWinners(
      winners.map((winner) =>
        winner.id === id
          ? { ...winner, notified: true, notificationDate: new Date().toISOString().split("T")[0] }
          : winner,
      ),
    )
  }

  const handleExportWinners = () => {
    // In a real app, you would generate and download a CSV/Excel file
    alert("Winners data would be exported here")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Raffle Winners</h1>
          <p className="text-gray-500">View and manage winners from all your raffles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportWinners}>
            <Download className="h-4 w-4" />
            Export Winners
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Winners Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">Total Winners</p>
              <p className="text-2xl font-bold">{winners.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Claimed Prizes</p>
              <p className="text-2xl font-bold">{winners.filter((w) => w.claimed).length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 mb-1">Pending Claims</p>
              <p className="text-2xl font-bold">{winners.filter((w) => !w.claimed).length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 mb-1">Notifications Sent</p>
              <p className="text-2xl font-bold">{winners.filter((w) => w.notified).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by raffle, prize, or winner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B8A9]"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Raffle</TableHead>
                  <TableHead>Prize</TableHead>
                  <TableHead>Win Date</TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWinners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No winners found</h3>
                      <p className="text-gray-500 mb-6">
                        {isDemoAccount(user)
                          ? "Try adjusting your search or filter to find what you're looking for."
                          : "Complete a raffle and draw a winner to see them here."}
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
                        {winner.claimed ? (
                          <Badge className="bg-green-500">Claimed</Badge>
                        ) : (
                          <Badge className="bg-yellow-500">Pending Claim</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/raffles/${winner.raffleId}/winners`}>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </Link>
                          {!winner.notified && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8"
                              onClick={() => handleNotifyWinner(winner.id)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Notify
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredWinners.length} of {winners.length} winners
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={filteredWinners.length < winners.length}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
