"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { BarChart3, Ticket, Users, MousePointer, ArrowRight, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demo accounts
const mockStats = {
  totalViews: 1243,
  ticketsIssued: 856,
  questionsAnswered: 712,
  pageClicks: 2134,
  activeRaffles: 2,
  completedRaffles: 3,
}

const mockRecentRaffles = [
  {
    id: "raffle-1",
    title: "Summer Giveaway",
    prize: "iPhone 13 Pro",
    status: "active",
    entries: 342,
    endDate: "2023-08-15",
  },
  {
    id: "raffle-2",
    title: "Customer Appreciation",
    prize: "$500 Gift Card",
    status: "active",
    entries: 214,
    endDate: "2023-08-22",
  },
  {
    id: "raffle-3",
    title: "Spring Promotion",
    prize: "Weekend Getaway",
    status: "completed",
    entries: 567,
    endDate: "2023-05-10",
  },
]

export default function Dashboard() {
  const { user, isDemoAccount } = useAuth()
  const [timeRange, setTimeRange] = useState("7days")
  const [stats, setStats] = useState(null)
  const [recentRaffles, setRecentRaffles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // For demo accounts, use mock data
    if (isDemoAccount()) {
      setStats(mockStats)
      setRecentRaffles(mockRecentRaffles)
      return
    }

    // For real accounts, fetch data from API
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Fetch stats
        const statsResponse = await fetch(`/api/dashboard/stats?timeRange=${timeRange}`)
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        } else {
          // If API fails, set empty stats
          setStats({
            totalViews: 0,
            ticketsIssued: 0,
            questionsAnswered: 0,
            pageClicks: 0,
            activeRaffles: 0,
            completedRaffles: 0,
          })
        }

        // Fetch recent raffles
        const rafflesResponse = await fetch("/api/raffles/recent")
        if (rafflesResponse.ok) {
          const rafflesData = await rafflesResponse.json()
          setRecentRaffles(rafflesData)
        } else {
          setRecentRaffles([])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Set empty data on error
        setStats({
          totalViews: 0,
          ticketsIssued: 0,
          questionsAnswered: 0,
          pageClicks: 0,
          activeRaffles: 0,
          completedRaffles: 0,
        })
        setRecentRaffles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [timeRange, isDemoAccount])

  // Use mock data for demo accounts or while loading for real accounts
  const displayStats = isDemoAccount()
    ? mockStats
    : stats || {
        totalViews: 0,
        ticketsIssued: 0,
        questionsAnswered: 0,
        pageClicks: 0,
        activeRaffles: 0,
        completedRaffles: 0,
      }

  const displayRaffles = isDemoAccount() ? mockRecentRaffles : recentRaffles

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Here's what's happening with your raffles today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
            <Link href="/dashboard/raffles/new">Create New Raffle</Link>
          </Button>
        </div>
      </div>

      {/* Time range selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border-gray-300 rounded-md focus:ring-[#00B8A9] focus:border-[#00B8A9]"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-[#00B8A9] mr-2" />
              <div className="text-2xl font-bold">{displayStats.totalViews}</div>
            </div>
            {isDemoAccount() && (
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12% increase</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tickets Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Ticket className="h-5 w-5 text-[#00B8A9] mr-2" />
              <div className="text-2xl font-bold">{displayStats.ticketsIssued}</div>
            </div>
            {isDemoAccount() && (
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>8% increase</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Questions Answered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-[#00B8A9] mr-2" />
              <div className="text-2xl font-bold">{displayStats.questionsAnswered}</div>
            </div>
            {isDemoAccount() && (
              <div className="mt-2 flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>3% decrease</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Page Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MousePointer className="h-5 w-5 text-[#00B8A9] mr-2" />
              <div className="text-2xl font-bold">{displayStats.pageClicks}</div>
            </div>
            {isDemoAccount() && (
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>15% increase</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent raffles */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Raffles</CardTitle>
          <CardDescription>
            {isDemoAccount()
              ? `You have ${displayStats.activeRaffles} active and ${displayStats.completedRaffles} completed raffles`
              : displayRaffles.length > 0
                ? `You have ${displayRaffles.filter((r) => r.status === "active").length} active and ${displayRaffles.filter((r) => r.status === "completed").length} completed raffles`
                : "You haven't created any raffles yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {displayRaffles.length > 0 ? (
            <div className="space-y-4">
              {displayRaffles.map((raffle) => (
                <div
                  key={raffle.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{raffle.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-4">Prize: {raffle.prize}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          raffle.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {raffle.status === "active" ? "Active" : "Completed"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                      <Ticket className="h-4 w-4 mr-1" />
                      <span>{raffle.entries} entries</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {raffle.status === "active"
                          ? `Ends: ${new Date(raffle.endDate).toLocaleDateString()}`
                          : `Ended: ${new Date(raffle.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Ticket className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No raffles yet</h3>
              <p className="text-sm text-gray-500 mb-4 max-w-md">
                Create your first raffle to start collecting entries and engaging with your audience.
              </p>
              <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
                <Link href="/dashboard/raffles/new">Create Your First Raffle</Link>
              </Button>
            </div>
          )}
        </CardContent>
        {displayRaffles.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/raffles" className="flex items-center justify-center">
                View All Raffles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

