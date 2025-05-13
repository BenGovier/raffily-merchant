"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download, BarChart3 } from "lucide-react"
import { format, subMonths } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { generateBrowserPDF } from "@/utils/browser-pdf-generator"
import { generateSimplePDF } from "@/utils/simple-pdf-generator"
import { useAuth } from "@/contexts/auth-context"

// Sample data for charts (for demo accounts)
const weeklyData = [
  { name: "Mon", views: 120, tickets: 80, questions: 65, clicks: 95 },
  { name: "Tue", views: 150, tickets: 100, questions: 85, clicks: 110 },
  { name: "Wed", views: 180, tickets: 120, questions: 95, clicks: 130 },
  { name: "Thu", views: 200, tickets: 140, questions: 110, clicks: 150 },
  { name: "Fri", views: 250, tickets: 160, questions: 130, clicks: 170 },
  { name: "Sat", views: 280, tickets: 180, questions: 150, clicks: 190 },
  { name: "Sun", views: 220, tickets: 150, questions: 120, clicks: 160 },
]

const monthlyData = [
  { name: "Jan", views: 1200, tickets: 800, questions: 650, clicks: 950 },
  { name: "Feb", views: 1500, tickets: 1000, questions: 850, clicks: 1100 },
  { name: "Mar", views: 1800, tickets: 1200, questions: 950, clicks: 1300 },
  { name: "Apr", views: 2000, tickets: 1400, questions: 1100, clicks: 1500 },
  { name: "May", views: 2500, tickets: 1600, questions: 1300, clicks: 1700 },
  { name: "Jun", views: 2800, tickets: 1800, questions: 1500, clicks: 1900 },
]

const raffleData = [
  { id: 1, name: "Summer Giveaway", views: 1200, tickets: 800, questions: 650, clicks: 950 },
  { id: 2, name: "Holiday Special", views: 1500, tickets: 1000, questions: 850, clicks: 1100 },
  { id: 3, name: "Anniversary Raffle", views: 1800, tickets: 1200, questions: 950, clicks: 1300 },
]

// Sample raffle campaign data for the report (for demo accounts)
const detailedRaffleData = [
  {
    name: "Summer Giveaway",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 30),
    entries: 800,
    revenue: 4000,
    conversion: 12.5,
    roi: 320,
  },
  {
    name: "Holiday Special",
    startDate: new Date(2023, 11, 1),
    endDate: new Date(2023, 11, 31),
    entries: 1000,
    revenue: 5500,
    conversion: 15.2,
    roi: 380,
  },
  {
    name: "Anniversary Raffle",
    startDate: new Date(2024, 2, 15),
    endDate: new Date(2024, 3, 15),
    entries: 1200,
    revenue: 6800,
    conversion: 18.7,
    roi: 410,
  },
]

export default function AnalyticsPage() {
  const { isDemoAccount } = useAuth()
  const [timeframe, setTimeframe] = useState("weekly")
  const [selectedRaffle, setSelectedRaffle] = useState("all")
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 3),
    to: new Date(),
  })
  const [analyticsData, setAnalyticsData] = useState([])
  const [userRaffles, setUserRaffles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // For demo accounts, use mock data
    if (isDemoAccount()) {
      return
    }

    // For real accounts, fetch data from API
    const fetchAnalyticsData = async () => {
      setIsLoading(true)
      try {
        // Fetch analytics data
        const from = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : ""
        const to = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""

        const response = await fetch(
          `/api/analytics?timeframe=${timeframe}&raffleId=${selectedRaffle}&from=${from}&to=${to}`,
        )

        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data.analytics || [])
        } else {
          setAnalyticsData([])
        }

        // Fetch user's raffles for the dropdown
        const rafflesResponse = await fetch("/api/raffles")
        if (rafflesResponse.ok) {
          const rafflesData = await rafflesResponse.json()
          setUserRaffles(rafflesData)
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setAnalyticsData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeframe, selectedRaffle, dateRange, isDemoAccount])

  // Use mock or real data based on account type
  const data = isDemoAccount()
    ? timeframe === "weekly"
      ? weeklyData
      : monthlyData
    : analyticsData.length > 0
      ? analyticsData
      : [{ name: "No Data", views: 0, tickets: 0, questions: 0, clicks: 0 }]

  // Function to handle report export
  const handleExportReport = async () => {
    try {
      setIsExporting(true)

      // Prepare data for the report
      const reportData = {
        companyName: "Raffily Merchant",
        dateRange: {
          start: dateRange?.from || subMonths(new Date(), 3),
          end: dateRange?.to || new Date(),
        },
        metrics: {
          totalEntries: data.reduce((sum, item) => sum + (item.tickets || 0), 0),
          totalRevenue: data.reduce((sum, item) => sum + (item.tickets || 0) * 5, 0),
          conversionRate:
            (data.reduce((sum, item) => sum + (item.tickets || 0), 0) /
              Math.max(
                1,
                data.reduce((sum, item) => sum + (item.views || 0), 0),
              )) *
            100,
          views: data.reduce((sum, item) => sum + (item.views || 0), 0),
          clicks: data.reduce((sum, item) => sum + (item.clicks || 0), 0),
        },
        raffleData: isDemoAccount() ? detailedRaffleData : userRaffles,
      }

      // Try to generate PDF with autoTable first
      try {
        await generateBrowserPDF(reportData)
      } catch (error) {
        console.error("Error with autoTable PDF, falling back to simple PDF:", error)
        // Fallback to simple PDF if autoTable fails
        await generateSimplePDF(reportData)
      }
    } catch (error) {
      console.error("Error exporting report:", error)
      alert("Failed to generate report. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRaffle} onValueChange={setSelectedRaffle}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select raffle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Raffles</SelectItem>
                {isDemoAccount()
                  ? raffleData.map((raffle) => (
                      <SelectItem key={raffle.id} value={raffle.id.toString()}>
                        {raffle.name}
                      </SelectItem>
                    ))
                  : userRaffles.map((raffle) => (
                      <SelectItem key={raffle.id} value={raffle.id}>
                        {raffle.title}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button
              className="bg-[#2D2A4A] hover:bg-[#3D3A5A] text-white w-full md:w-auto"
              onClick={handleExportReport}
              disabled={isExporting || (!isDemoAccount() && analyticsData.length === 0)}
            >
              {isExporting ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Report
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B8A9]"></div>
        </div>
      ) : !isDemoAccount() && analyticsData.length === 0 ? (
        <EmptyAnalyticsState />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Page Views"
              value={data.reduce((sum, item) => sum + (item.views || 0), 0)}
              description="People who visited your raffle page"
              trend={isDemoAccount() ? "+12.5%" : null}
              trendDirection="up"
            />
            <MetricCard
              title="Tickets Issued"
              value={data.reduce((sum, item) => sum + (item.tickets || 0), 0)}
              description="Number of raffle entries"
              trend={isDemoAccount() ? "+8.3%" : null}
              trendDirection="up"
            />
            <MetricCard
              title="Questions Answered"
              value={data.reduce((sum, item) => sum + (item.questions || 0), 0)}
              description="Data capture responses"
              trend={isDemoAccount() ? "+5.7%" : null}
              trendDirection="up"
            />
            <MetricCard
              title="Page Clicks"
              value={data.reduce((sum, item) => sum + (item.clicks || 0), 0)}
              description="Engagement on your raffle page"
              trend={isDemoAccount() ? "+10.2%" : null}
              trendDirection="up"
            />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pageViews">Page Views</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Track all metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="#00B8A9" name="Page Views" />
                        <Line type="monotone" dataKey="tickets" stroke="#0072B5" name="Tickets" />
                        <Line type="monotone" dataKey="questions" stroke="#BC4749" name="Questions" />
                        <Line type="monotone" dataKey="clicks" stroke="#6A0572" name="Clicks" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Rate</CardTitle>
                    <CardDescription>Views to tickets conversion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="views" fill="#00B8A9" name="Views" />
                          <Bar dataKey="tickets" fill="#0072B5" name="Tickets" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Rate</CardTitle>
                    <CardDescription>Clicks and questions answered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="clicks" fill="#6A0572" name="Clicks" />
                          <Bar dataKey="questions" fill="#BC4749" name="Questions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pageViews">
              <Card>
                <CardHeader>
                  <CardTitle>Page Views Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of page views over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="#00B8A9" name="Page Views" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>Tickets Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of tickets issued over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tickets" stroke="#0072B5" name="Tickets" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Questions Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of questions answered over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="questions" stroke="#BC4749" name="Questions" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

function EmptyAnalyticsState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-100 p-3 mb-4">
        <BarChart3 className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No analytics data yet</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-md">
        Create and publish your first raffle to start collecting analytics data. Once your raffle is live, you'll see
        metrics here.
      </p>
      <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
        <a href="/dashboard/raffles/new">Create Your First Raffle</a>
      </Button>
    </div>
  )
}

function MetricCard({ title, value, description, trend, trendDirection }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          {trend && (
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                trendDirection === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {trend}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

