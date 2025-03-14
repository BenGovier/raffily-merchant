"use client"

import { useState } from "react"
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

// Sample data for charts
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

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [selectedRaffle, setSelectedRaffle] = useState("all")

  const data = timeframe === "weekly" ? weeklyData : monthlyData

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRaffle} onValueChange={setSelectedRaffle}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select raffle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Raffles</SelectItem>
              {raffleData.map((raffle) => (
                <SelectItem key={raffle.id} value={raffle.id.toString()}>
                  {raffle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Page Views"
          value={data.reduce((sum, item) => sum + item.views, 0)}
          description="People who visited your raffle page"
          trend="+12.5%"
          trendDirection="up"
        />
        <MetricCard
          title="Tickets Issued"
          value={data.reduce((sum, item) => sum + item.tickets, 0)}
          description="Number of raffle entries"
          trend="+8.3%"
          trendDirection="up"
        />
        <MetricCard
          title="Questions Answered"
          value={data.reduce((sum, item) => sum + item.questions, 0)}
          description="Data capture responses"
          trend="+5.7%"
          trendDirection="up"
        />
        <MetricCard
          title="Page Clicks"
          value={data.reduce((sum, item) => sum + item.clicks, 0)}
          description="Engagement on your raffle page"
          trend="+10.2%"
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
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              trendDirection === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

