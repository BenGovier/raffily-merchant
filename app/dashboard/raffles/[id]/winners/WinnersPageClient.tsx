"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Download, Mail, Share2 } from "lucide-react"

// Mock data for winners
const mockWinner = {
  id: "winner-001",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "+1 (555) 123-4567",
  entryDate: "2023-08-10T14:32:00Z",
  winDate: "2023-08-15T16:00:00Z",
  claimed: true,
  claimDate: "2023-08-16T09:15:00Z",
  customFields: [
    { question: "What's your favorite product?", answer: "Premium Subscription" },
    { question: "How did you hear about us?", answer: "Social Media" },
  ],
}

export default function WinnersPageClient() {
  const params = useParams()
  const id = params.id as string

  const raffleId = params.id as string
  const [winner, setWinner] = useState(mockWinner)
  const [isLoading, setIsLoading] = useState(true)
  const [raffleDetails, setRaffleDetails] = useState({
    title: "Summer Promotion",
    prize: "MacBook Pro",
    endDate: "2023-08-15T16:00:00Z",
    totalEntries: 342,
  })

  useEffect(() => {
    // In a real implementation, fetch the winner data from your API
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [raffleId])

  const handleContactWinner = () => {
    // Implement contact winner functionality
    alert("Contact winner functionality would open here")
  }

  const handleDownloadDetails = () => {
    // Implement download details functionality
    alert("Winner details would download here")
  }

  const handleShareWinner = () => {
    // Implement share winner functionality
    alert("Share winner functionality would open here")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Raffle Winners</h1>
        <p className="text-gray-500">
          View and manage winners for <span className="font-medium">{raffleDetails.title}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Prize</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{raffleDetails.prize}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">End Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{new Date(raffleDetails.endDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{raffleDetails.totalEntries}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="winner" className="space-y-6">
        <TabsList>
          <TabsTrigger value="winner">Winner Details</TabsTrigger>
          <TabsTrigger value="notification">Notification History</TabsTrigger>
        </TabsList>

        <TabsContent value="winner">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B8A9]"></div>
            </div>
          ) : (
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="h-5 w-5 text-[#00B8A9] mr-2" />
                    Winner Information
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleContactWinner}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadDetails}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShareWinner}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Personal Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{winner.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{winner.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{winner.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-4">Entry & Prize Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Entry Date</p>
                        <p className="font-medium">{new Date(winner.entryDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Win Date</p>
                        <p className="font-medium">{new Date(winner.winDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Prize Status</p>
                        <p className="font-medium flex items-center">
                          {winner.claimed ? (
                            <>
                              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                              Claimed on {new Date(winner.claimDate).toLocaleDateString()}
                            </>
                          ) : (
                            <>
                              <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
                              Not Claimed
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {winner.customFields && winner.customFields.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-4">Additional Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {winner.customFields.map((field, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <p className="text-sm text-gray-500">{field.question}</p>
                          <p className="font-medium">{field.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Winner Notification Email</p>
                    <p className="text-sm text-gray-500">Sent on {new Date(winner.winDate).toLocaleString()}</p>
                    <p className="text-sm mt-1">
                      Congratulations email sent to {winner.email} with prize claim instructions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Prize Claim Confirmation</p>
                    <p className="text-sm text-gray-500">Sent on {new Date(winner.claimDate).toLocaleString()}</p>
                    <p className="text-sm mt-1">Confirmation email sent after the winner claimed their prize.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
