"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, MoreHorizontal, Trash2, Users, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface Raffle {
  _id: string
  title: string
  description: string
  prize: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "completed" | "draft"
  entries: number
  merchantId: string
}

interface RafflesListProps {
  status: "active" | "scheduled" | "completed" | "draft"
}

export function RafflesList({ status }: RafflesListProps) {
  const { user } = useAuth()
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        setLoading(true)

        // Build query parameters
        const params = new URLSearchParams()
        params.append("status", status)

        // Add merchantId if user is logged in
        if (user?.id && user.id !== "demo-user") {
          params.append("merchantId", user.id)
        }

        const response = await fetch(`/api/raffles?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch raffles")
        }

        const data = await response.json()
        setRaffles(data)
      } catch (err: any) {
        console.error("Error fetching raffles:", err)
        setError(err.message || "An error occurred while fetching raffles")
      } finally {
        setLoading(false)
      }
    }

    fetchRaffles()
  }, [status, user])

  const handleDeleteRaffle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this raffle?")) {
      return
    }

    try {
      const response = await fetch(`/api/raffles/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete raffle")
      }

      // Remove the deleted raffle from the state
      setRaffles(raffles.filter((raffle) => raffle._id !== id))
    } catch (err: any) {
      console.error("Error deleting raffle:", err)
      alert(err.message || "An error occurred while deleting the raffle")
    }
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
    <div className="space-y-6">
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading raffles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/dashboard/raffles/new">
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">Create a Raffle</Button>
          </Link>
        </div>
      ) : raffles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No {status} raffles found</p>
          <Link href="/dashboard/raffles/new">
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">Create a Raffle</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raffles.map((raffle) => (
              <div
                key={raffle._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">{raffle.title}</h3>
                    <Badge
                      className={
                        raffle.status === "active"
                          ? "bg-green-500"
                          : raffle.status === "scheduled"
                            ? "bg-blue-500"
                            : raffle.status === "completed"
                              ? "bg-gray-500"
                              : "bg-yellow-500"
                      }
                    >
                      {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{raffle.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formatDuration(raffle.startDate, raffle.endDate, raffle.status)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{raffle.entries} entries</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-gray-700">Prize:</p>
                      <p className="text-sm text-gray-600">{raffle.prize}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/raffles/${raffle._id}`} className="flex w-full items-center">
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/raffles/${raffle._id}/edit`} className="flex w-full items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRaffle(raffle._id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/dashboard/raffles/new">
              <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Raffle
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
