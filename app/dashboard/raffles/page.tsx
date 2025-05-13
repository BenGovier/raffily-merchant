"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
  LinkIcon,
  Copy,
  Check,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

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
    url: "https://raffily.com/r/summer-promo-2023",
  },
  {
    id: "raffle-002",
    title: "Customer Appreciation",
    prize: "$500 Gift Card",
    startDate: "2023-08-01T00:00:00Z",
    endDate: "2023-08-22T23:59:59Z",
    entries: 214,
    status: "active",
    url: "https://raffily.com/r/customer-appreciation-2023",
  },
  {
    id: "raffle-003",
    title: "Fall Giveaway",
    prize: "iPhone 14",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    entries: 0,
    status: "scheduled",
    url: "https://raffily.com/r/fall-giveaway-2023",
  },
  {
    id: "raffle-004",
    title: "Holiday Special",
    prize: "Weekend Getaway",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-25T23:59:59Z",
    entries: 0,
    status: "draft",
    url: "",
  },
  {
    id: "raffle-005",
    title: "New Year Celebration",
    prize: "Smart TV",
    startDate: "2023-12-26T00:00:00Z",
    endDate: "2024-01-10T23:59:59Z",
    entries: 0,
    status: "pending",
    url: "",
  },
]

export default function RafflesPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [raffles, setRaffles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("active")

  // Helper function to check if user is a demo account
  const isDemoAccount = (user) => {
    const demoEmails = ["demo@example.com", "ben@raffily.com"]
    return demoEmails.includes(user?.email) || (user?.id && typeof user.id === "string" && user.id.includes("demo"))
  }

  useEffect(() => {
    // Check for tab parameter in URL
    const tabParam = searchParams.get("tab")
    if (tabParam && ["active", "completed", "scheduled", "draft", "pending"].includes(tabParam)) {
      setActiveTab(tabParam)
    }

    // Check for success message
    const successMessage = searchParams.get("success")
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
        duration: 5000,
      })
    }

    const fetchRaffles = async () => {
      try {
        if (!user) {
          setRaffles([])
          setIsLoading(false)
          return
        }

        if (isDemoAccount(user)) {
          // For demo accounts, get any stored raffles from localStorage
          console.log("Using mock data for demo account")
          const storedRaffles = localStorage.getItem("demoRaffles")
          const demoRaffles = storedRaffles ? JSON.parse(storedRaffles) : []

          // Combine with mock data
          setRaffles([...demoRaffles, ...mockRaffles])
        } else {
          // For real merchant accounts, fetch from API
          // In a real implementation, this would be an API call
          // For now, we'll set an empty array to show no raffles for real accounts
          console.log("Real merchant account - should fetch from API")
          setRaffles([])

          // Uncomment and implement when API is ready:
          // const response = await fetch('/api/raffles');
          // if (response.ok) {
          //   const data = await response.json();
          //   setRaffles(data);
          // } else {
          //   console.error('Failed to fetch raffles');
          //   setRaffles([]);
          // }
        }
      } catch (error) {
        console.error("Error fetching raffles:", error)
        setRaffles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRaffles()

    // Check URL for new raffle parameter
    const newRaffleParam = searchParams.get("newRaffle")

    if (newRaffleParam && isDemoAccount(user)) {
      try {
        const newRaffle = JSON.parse(decodeURIComponent(newRaffleParam))

        // Add the new raffle to localStorage for demo accounts
        const storedRaffles = localStorage.getItem("demoRaffles")
        const demoRaffles = storedRaffles ? JSON.parse(storedRaffles) : []

        // Add the new raffle
        demoRaffles.unshift(newRaffle)

        // Store back in localStorage
        localStorage.setItem("demoRaffles", JSON.stringify(demoRaffles))

        // Update state
        setRaffles((prevRaffles) => [newRaffle, ...prevRaffles])
      } catch (e) {
        console.error("Error parsing new raffle data:", e)
      }
    }
  }, [user, searchParams, toast])

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
      // For demo accounts, also remove from localStorage
      if (isDemoAccount(user)) {
        const storedRaffles = localStorage.getItem("demoRaffles")
        if (storedRaffles) {
          const demoRaffles = JSON.parse(storedRaffles).filter((raffle: any) => raffle.id !== id)
          localStorage.setItem("demoRaffles", JSON.stringify(demoRaffles))
        }
      }

      setRaffles(raffles.filter((raffle) => raffle.id !== id))

      toast({
        title: "Raffle deleted",
        description: "The raffle has been successfully deleted.",
        duration: 3000,
      })
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // Format duration string based on start and end dates
  const formatDuration = (startDate: string, endDate: string, status: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (status === "completed") {
      return `Ended on ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    }

    if (status === "draft") {
      return "Draft"
    }

    if (status === "scheduled" && start > now) {
      const days = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return `Starts in ${days} day${days !== 1 ? "s" : ""}`
    }

    if (status === "active" && end > now) {
      const days = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return `Ends in ${days} day${days !== 1 ? "s" : ""}`
    }

    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
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

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRaffles(status).map((raffle) => (
                  <div
                    key={raffle.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-lg text-gray-800 truncate">{raffle.title}</h3>
                        {getStatusBadge(raffle.status)}
                      </div>

                      <p className="text-gray-600 mb-4">Prize: {raffle.prize}</p>

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

                      <div className="flex items-center mb-4">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{raffle.entries} entries</span>
                      </div>

                      {raffle.url && (
                        <div className="flex items-center mb-4">
                          <LinkIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm mr-2 truncate">Raffle URL</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2 text-blue-600"
                                  onClick={() => copyToClipboard(raffle.url, raffle.id)}
                                >
                                  {copiedId === raffle.id ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copiedId === raffle.id ? "Copied!" : "Copy URL"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4 mr-2" />
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
                            {raffle.url && (
                              <DropdownMenuItem
                                className="cursor-pointer flex items-center"
                                onClick={() => copyToClipboard(raffle.url, raffle.id)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Raffle URL
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
                            className={`${raffle.hasWinner ? "bg-[#00B8A9] hover:bg-[#00B8A9]/90" : "bg-blue-500 hover:bg-blue-600"}`}
                            size="sm"
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
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

