"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.push("/admin/login")
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
          <TabsTrigger value="raffles">Raffles</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+5.4% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Raffles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,531</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,543</div>
                <p className="text-xs text-muted-foreground">+7.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Acme Corp", date: "2 hours ago" },
                    { name: "Globex Industries", date: "5 hours ago" },
                    { name: "Stark Enterprises", date: "1 day ago" },
                    { name: "Wayne Enterprises", date: "2 days ago" },
                    { name: "Umbrella Corporation", date: "3 days ago" },
                  ].map((merchant, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="font-medium">{merchant.name}</div>
                      <div className="text-sm text-muted-foreground">{merchant.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Raffles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Summer Giveaway", merchant: "Acme Corp", status: "Active" },
                    { name: "Customer Appreciation", merchant: "Globex Industries", status: "Active" },
                    { name: "Holiday Special", merchant: "Stark Enterprises", status: "Scheduled" },
                    { name: "Anniversary Raffle", merchant: "Wayne Enterprises", status: "Completed" },
                    { name: "Product Launch", merchant: "Umbrella Corporation", status: "Active" },
                  ].map((raffle, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{raffle.name}</div>
                        <div className="text-sm text-muted-foreground">{raffle.merchant}</div>
                      </div>
                      <div
                        className={`text-sm px-2 py-1 rounded-full ${
                          raffle.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : raffle.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {raffle.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="merchants">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Merchant management tools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raffles">
          <Card>
            <CardHeader>
              <CardTitle>Raffle Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Raffle management tools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

