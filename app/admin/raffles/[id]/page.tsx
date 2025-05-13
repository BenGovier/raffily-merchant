"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, ExternalLink, Eye, ImageIcon, MessageSquare, XCircle } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Mock data for a raffle
const mockRaffle = {
  id: "raffle-101",
  title: "Summer Promotion",
  merchant: {
    name: "ABC Retail",
    email: "contact@abcretail.com",
    phone: "+44 123 456 7890",
  },
  prize: "MacBook Pro",
  description:
    "We're giving away a brand new MacBook Pro to celebrate our summer promotion. Enter for a chance to win this amazing prize!",
  additionalPrizes: [
    { name: "AirPods Pro", description: "Second prize" },
    { name: "$100 Gift Card", description: "Third prize" },
  ],
  duration: "14",
  websiteLink: "https://abcretail.com",
  dataQuestion: "What month does your home insurance renew?",
  images: ["logo.png", "macbook.jpg", "airpods.jpg"],
  submittedDate: "2023-08-10",
  status: "pending",
  url: "https://raffily.com/r/summer-promo-2023",
}

export default function AdminRaffleDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [raffleUrl, setRaffleUrl] = useState(mockRaffle.url || "")

  const handleApprove = async () => {
    setIsLoading(true)
    // Validate URL before approving
    if (!raffleUrl) {
      alert("Please set a raffle URL before approving")
      setIsLoading(false)
      return
    }

    // In a real implementation, you would make an API call to approve the raffle with the URL
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/admin/dashboard")
  }

  const handleReject = async () => {
    setIsLoading(true)
    // In a real implementation, you would make an API call to reject the raffle
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="text-white hover:bg-white/10 mb-4" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{mockRaffle.title}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300">
                  Pending Approval
                </span>
              </div>
              <p className="text-blue-200">Raffle ID: {mockRaffle.id}</p>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleApprove}
                disabled={isLoading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Raffle
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={isLoading}>
                <XCircle className="h-4 w-4 mr-2" />
                Reject Raffle
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/10 border-none text-white md:col-span-2">
            <CardHeader>
              <CardTitle>Raffle Details</CardTitle>
              <CardDescription className="text-blue-200">
                Submitted on {new Date(mockRaffle.submittedDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Main Prize</h3>
                <p>{mockRaffle.prize}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Description</h3>
                <p>{mockRaffle.description}</p>
              </div>

              {mockRaffle.additionalPrizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-blue-200 mb-1">Additional Prizes</h3>
                  <ul className="space-y-2">
                    {mockRaffle.additionalPrizes.map((prize, index) => (
                      <li key={index} className="bg-white/5 p-3 rounded-md">
                        <p className="font-medium">{prize.name}</p>
                        <p className="text-sm text-blue-200">{prize.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-200 mb-1">Duration</h3>
                  <p>{mockRaffle.duration} days</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-200 mb-1">Website Link</h3>
                  <a
                    href={mockRaffle.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#00B8A9] hover:underline"
                  >
                    {mockRaffle.websiteLink}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Data Capture Question</h3>
                <p>{mockRaffle.dataQuestion}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Raffle URL</h3>
                <div className="flex items-center gap-2">
                  <Input
                    value={raffleUrl}
                    onChange={(e) => setRaffleUrl(e.target.value)}
                    placeholder="https://raffily.com/r/raffle-name"
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Button
                    onClick={() => {
                      // In a real implementation, this would update the URL in the database
                      alert("Raffle URL updated successfully")
                    }}
                    className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 whitespace-nowrap"
                  >
                    Update URL
                  </Button>
                </div>
                <p className="text-xs text-blue-200 mt-1">This URL will be shared with the merchant after approval</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-none text-white">
            <CardHeader>
              <CardTitle>Merchant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Company Name</h3>
                <p>{mockRaffle.merchant.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Email</h3>
                <p>{mockRaffle.merchant.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-200 mb-1">Phone</h3>
                <p>{mockRaffle.merchant.phone}</p>
              </div>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white/10">
                <Eye className="h-4 w-4 mr-2" />
                View Merchant Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList className="bg-white/10 border-none">
            <TabsTrigger value="images" className="data-[state=active]:bg-white data-[state=active]:text-[#0A1F44]">
              Uploaded Images
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-white data-[state=active]:text-[#0A1F44]">
              Provide Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockRaffle.images.map((image, index) => (
                <Card key={index} className="bg-white/5 border-none text-white">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center mb-3">
                      <ImageIcon className="h-12 w-12 text-blue-200" />
                    </div>
                    <h3 className="font-medium">{image}</h3>
                    <div className="flex justify-between mt-3">
                      <Button size="sm" variant="ghost" className="text-white">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <div className="flex gap-1">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-2">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="px-2">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="bg-white/10 border-none text-white">
              <CardHeader>
                <CardTitle>Feedback to Merchant</CardTitle>
                <CardDescription className="text-blue-200">
                  Provide feedback or request changes to the raffle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your feedback or change requests here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-blue-200"
                  rows={6}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => setFeedbackText("")}
                >
                  Clear
                </Button>
                <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
