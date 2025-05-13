"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AILoadingAnimation } from "@/components/marketing/AILoadingAnimation"
import {
  AlertCircle,
  CheckCircle,
  Send,
  Users,
  FileText,
  BarChart2,
  Plus,
  CreditCard,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { calculateCreditsNeeded } from "@/lib/stripe-config"
import { useToast } from "@/components/ui/use-toast"

export default function SMSMarketingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [setupLoading, setSetupLoading] = useState(false)
  const [selectedRaffle, setSelectedRaffle] = useState("")
  const [message, setMessage] = useState("")
  const [campaignName, setCampaignName] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState("")
  const [sentMessages, setSentMessages] = useState([])
  const [characterCount, setCharacterCount] = useState(0)
  const [messagePreview, setMessagePreview] = useState("")
  const [activeTab, setActiveTab] = useState("compose")
  const [sendStatus, setSendStatus] = useState(null)
  const [apiResponse, setApiResponse] = useState(null)
  const [showApiDetails, setShowApiDetails] = useState(false)
  const [setupStatus, setSetupStatus] = useState(null)
  const [userCredits, setUserCredits] = useState(0)
  const [creditsLoading, setCreditsLoading] = useState(true)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [raffles, setRaffles] = useState([])
  const [rafflesLoading, setRafflesLoading] = useState(true)
  const [contactLists, setContactLists] = useState([])
  const [contactListsLoading, setContactListsLoading] = useState(true)
  const [campaigns, setCampaigns] = useState([])
  const [campaignsLoading, setCampaignsLoading] = useState(true)
  const [campaignStats, setCampaignStats] = useState({
    total: 0,
    sent: 0,
    recipients: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
  })
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")

  // Mock contact lists - in a real app, this would come from an API
  const mockContactLists = [
    { id: "1", name: "All Customers", count: 245 },
    { id: "2", name: "VIP Customers", count: 58 },
    { id: "3", name: "Recent Participants", count: 112 },
  ]

  useEffect(() => {
    // Load user data
    if (user) {
      loadUserCredits()
      loadRaffles()
      loadCampaigns()

      // For now, use mock contact lists
      setContactLists(mockContactLists)
      setContactListsLoading(false)
    }
  }, [user])

  const loadUserCredits = async () => {
    if (!user) return

    setCreditsLoading(true)
    try {
      const response = await fetch(`/api/credits?userId=${user.id}`)
      const data = await response.json()

      if (data.success) {
        setUserCredits(data.balance)
      } else {
        console.error("Error loading credits:", data.error)
        toast({
          title: "Error loading credits",
          description: data.error || "Failed to load credit balance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading user credits:", error)
      toast({
        title: "Error loading credits",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setCreditsLoading(false)
    }
  }

  const loadRaffles = async () => {
    if (!user) return

    setRafflesLoading(true)
    try {
      const response = await fetch(`/api/raffles?merchantId=${user.id}`)
      const data = await response.json()

      if (data.success) {
        setRaffles(data.raffles || [])
      } else {
        console.error("Error loading raffles:", data.error)
      }
    } catch (error) {
      console.error("Error loading raffles:", error)
    } finally {
      setRafflesLoading(false)
    }
  }

  const loadCampaigns = async () => {
    if (!user) return

    setCampaignsLoading(true)
    try {
      const response = await fetch(`/api/campaigns?userId=${user.id}&type=sms`)
      const data = await response.json()

      if (data.success) {
        setCampaigns(data.campaigns || [])
        setCampaignStats(
          data.stats || {
            total: 0,
            sent: 0,
            recipients: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
          },
        )
      } else {
        console.error("Error loading campaigns:", data.error)
      }
    } catch (error) {
      console.error("Error loading campaigns:", error)
    } finally {
      setCampaignsLoading(false)
    }
  }

  useEffect(() => {
    // Update character count
    setCharacterCount(message.length)

    // Update message preview
    if (selectedRaffle && message) {
      const selectedRaffleName = raffles.find((r) => r._id === selectedRaffle)?.name || ""
      setMessagePreview(message.replace(/\[RAFFLE_NAME\]/g, selectedRaffleName))
    } else {
      setMessagePreview(message)
    }

    // Calculate estimated cost
    const phoneNumbersArray = phoneNumbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num)
    const isContactList = phoneNumbers.trim().startsWith("[Contact List:")
    const recipientCount = isContactList
      ? contactLists.find((list) => phoneNumbers.includes(list.name))?.count || 0
      : phoneNumbersArray.length

    setEstimatedCost(calculateCreditsNeeded(recipientCount))
  }, [message, selectedRaffle, phoneNumbers, raffles, contactLists])

  const handleSetupClickSend = async () => {
    setSetupLoading(true)
    setSetupStatus(null)

    try {
      const response = await fetch("/api/marketing/setup-clicksend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryCode: "GB", // Default to UK
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSetupStatus({
          success: true,
          message: "ClickSend default sender configured successfully!",
        })
        toast({
          title: "Success",
          description: "ClickSend default sender configured successfully!",
          variant: "default",
        })
      } else {
        setSetupStatus({
          success: false,
          message: data.error || "Failed to configure ClickSend default sender.",
        })
        toast({
          title: "Error",
          description: data.error || "Failed to configure ClickSend default sender.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error setting up ClickSend:", error)
      setSetupStatus({
        success: false,
        message: error.message || "An error occurred while setting up ClickSend.",
      })
      toast({
        title: "Error",
        description: error.message || "An error occurred while setting up ClickSend.",
        variant: "destructive",
      })
    } finally {
      setSetupLoading(false)
    }
  }

  const handleSendSMS = async () => {
    if (!user) {
      setSendStatus({
        success: false,
        message: "You must be logged in to send SMS messages.",
      })
      toast({
        title: "Error",
        description: "You must be logged in to send SMS messages.",
        variant: "destructive",
      })
      return
    }

    if (!campaignName) {
      setSendStatus({
        success: false,
        message: "Please enter a campaign name.",
      })
      toast({
        title: "Error",
        description: "Please enter a campaign name.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSendStatus(null)
    setApiResponse(null)
    setShowApiDetails(false)

    try {
      // Validate phone numbers
      const phoneNumbersArray = phoneNumbers
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num)

      if (phoneNumbersArray.length === 0) {
        throw new Error("Please enter at least one valid phone number")
      }

      // For demo purposes, if the phone numbers start with "[Contact List:", we'll simulate using a contact list
      const isContactList = phoneNumbers.trim().startsWith("[Contact List:")
      const finalPhoneNumbers = isContactList
        ? ["12345678901", "12345678902", "12345678903"] // Simulate contact list numbers
        : phoneNumbersArray

      // Check if user has enough credits
      const creditsNeeded = calculateCreditsNeeded(finalPhoneNumbers.length)
      if (userCredits < creditsNeeded) {
        setSendStatus({
          success: false,
          message: `Insufficient credits. You need ${creditsNeeded} credits but only have ${userCredits}.`,
          insufficientCredits: true,
        })
        toast({
          title: "Insufficient Credits",
          description: `You need ${creditsNeeded} credits but only have ${userCredits}.`,
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      console.log("Sending SMS to:", finalPhoneNumbers)

      // Call the API
      const response = await fetch("/api/marketing/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messagePreview,
          phoneNumbers: finalPhoneNumbers,
          raffleId: selectedRaffle,
          userId: user.id,
          campaignName: campaignName,
          scheduledFor: isScheduled ? scheduledDate : undefined,
        }),
      })

      const data = await response.json()
      setApiResponse(data)

      if (data.success) {
        setSendStatus({ success: true, message: "SMS messages sent successfully!" })
        toast({
          title: "Success",
          description: "SMS messages sent successfully!",
          variant: "default",
        })

        // Reload campaigns to show the new one
        loadCampaigns()

        // Update user credits
        setUserCredits(data.remainingCredits || 0)

        // Reset form
        setMessage("")
        setPhoneNumbers("")
        setSelectedRaffle("")
        setCampaignName("")
        setIsScheduled(false)
        setScheduledDate("")
      } else {
        setSendStatus({
          success: false,
          message: data.error || "Failed to send SMS messages. Check the API response for details.",
        })
        toast({
          title: "Error",
          description: data.error || "Failed to send SMS messages.",
          variant: "destructive",
        })

        // If credits were refunded, update the balance
        if (data.creditsRefunded) {
          await loadUserCredits()
        }
      }
    } catch (error) {
      console.error("Error sending SMS:", error)
      setSendStatus({
        success: false,
        message: error.message || "An error occurred while sending SMS messages.",
      })
      setApiResponse({ error: error.message || "Unknown error" })
      toast({
        title: "Error",
        description: error.message || "An error occurred while sending SMS messages.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SMS Marketing</h1>

        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg flex items-center">
            <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-blue-700">Available Credits</p>
              <p className="font-bold text-blue-800">{creditsLoading ? "..." : userCredits}</p>
            </div>
          </div>

          <Button
            onClick={() => router.push("/dashboard/marketing/sms/credits")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Credits
          </Button>
        </div>
      </div>

      {userCredits < 50 && !creditsLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Low SMS Credits</h3>
              <p className="text-sm text-blue-700 mt-1">
                You currently have <span className="font-bold">{userCredits}</span> SMS credits remaining. Purchase more
                credits to continue sending SMS messages.
              </p>
              <div className="mt-3">
                <Button
                  onClick={() => router.push("/dashboard/marketing/sms/credits")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy SMS Credits
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="compose" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="compose">Compose SMS</TabsTrigger>
          <TabsTrigger value="contacts">Contact Lists</TabsTrigger>
          <TabsTrigger value="history">Campaign History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compose SMS Message</CardTitle>
                  <CardDescription>Create an SMS message to send to your customers about your raffle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input
                      id="campaign-name"
                      placeholder="Enter a name for this campaign"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="raffle">Select Raffle</Label>
                    <Select value={selectedRaffle} onValueChange={setSelectedRaffle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a raffle" />
                      </SelectTrigger>
                      <SelectContent>
                        {rafflesLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading raffles...
                          </SelectItem>
                        ) : raffles.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No raffles found
                          </SelectItem>
                        ) : (
                          raffles.map((raffle) => (
                            <SelectItem key={raffle._id} value={raffle._id}>
                              {raffle.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="message">Message</Label>
                      <span className={`text-xs ${characterCount > 160 ? "text-red-500" : "text-gray-500"}`}>
                        {characterCount}/160 characters
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Enter your message. Use [RAFFLE_NAME] to insert the raffle name."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px]"
                    />
                    {characterCount > 160 && (
                      <p className="text-xs text-red-500">
                        Your message exceeds 160 characters and may be split into multiple SMS messages.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Textarea
                      id="recipients"
                      placeholder="Enter phone numbers separated by commas (e.g., +447123456789, +447987654321)"
                      value={phoneNumbers}
                      onChange={(e) => setPhoneNumbers(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-gray-500">
                      For testing, use your own mobile number in international format (e.g., +447123456789).
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                    <Label htmlFor="schedule">Schedule for later</Label>
                  </div>

                  {isScheduled && (
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Schedule Date</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="schedule-date"
                          type="datetime-local"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                        <Button variant="outline" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {estimatedCost > 0 && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Estimated Cost</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-600 text-sm">{estimatedCost} credits</span>
                        <Badge variant={userCredits >= estimatedCost ? "outline" : "destructive"}>
                          {userCredits >= estimatedCost ? "Sufficient Credits" : "Insufficient Credits"}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button
                    onClick={handleSendSMS}
                    disabled={!message || !phoneNumbers || !selectedRaffle || !campaignName || loading}
                  >
                    {loading ? (
                      <AILoadingAnimation />
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {isScheduled ? "Schedule SMS" : "Send SMS"}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {sendStatus && (
                <div
                  className={`mt-4 p-4 rounded-md ${sendStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <div className="flex items-center">
                    {sendStatus.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <p className={sendStatus.success ? "text-green-700" : "text-red-700"}>{sendStatus.message}</p>
                  </div>

                  {sendStatus.insufficientCredits && (
                    <div className="mt-3">
                      <p className="text-sm text-red-700 mb-2">
                        You need more credits to send this message. Purchase credits now to continue.
                      </p>
                      <Button
                        onClick={() => router.push("/dashboard/marketing/sms/credits")}
                        size="default"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Buy SMS Credits
                      </Button>
                    </div>
                  )}

                  {apiResponse && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiDetails(!showApiDetails)}
                        className="text-xs"
                      >
                        {showApiDetails ? "Hide" : "Show"} API Response Details
                      </Button>

                      {showApiDetails && (
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Message Preview</CardTitle>
                  <CardDescription>See how your message will appear on a mobile device</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 max-w-[300px] mx-auto">
                    <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Raffily</div>
                      <div className="text-sm">{messagePreview || "Your message preview will appear here"}</div>
                      <div className="text-xs text-gray-400 text-right mt-2">Just now</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>SMS Templates</CardTitle>
                  <CardDescription>Quick templates to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() =>
                      setMessage("Don't miss your chance to win [RAFFLE_NAME]! Enter now at raffily.com/enter")
                    }
                  >
                    <div>
                      <p className="font-medium">Raffle Announcement</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Don't miss your chance to win [RAFFLE_NAME]! Enter now at raffily.com/enter
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() =>
                      setMessage(
                        "Last day to enter [RAFFLE_NAME]! Drawing happens tonight. Enter now: raffily.com/enter",
                      )
                    }
                  >
                    <div>
                      <p className="font-medium">Last Chance Reminder</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last day to enter [RAFFLE_NAME]! Drawing happens tonight. Enter now: raffily.com/enter
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() =>
                      setMessage("Congratulations! You've won [RAFFLE_NAME]. Claim your prize at raffily.com/claim")
                    }
                  >
                    <div>
                      <p className="font-medium">Winner Notification</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Congratulations! You've won [RAFFLE_NAME]. Claim your prize at raffily.com/claim
                      </p>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>SMS Credits</CardTitle>
                  <CardDescription>Pay-as-you-go SMS messaging</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Available Credits</p>
                      <p className="text-2xl font-bold">{creditsLoading ? "..." : userCredits}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    <p>1 credit = 1 standard SMS message</p>
                    <p className="mt-1">Purchase credits in bundles to save money</p>
                  </div>

                  <Button className="w-full mt-2" onClick={() => router.push("/dashboard/marketing/sms/credits")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy More Credits
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Contact Lists</CardTitle>
                    <CardDescription>Manage your SMS contact lists</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New List
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactListsLoading ? (
                      <div className="text-center py-8">Loading contact lists...</div>
                    ) : contactLists.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No contact lists found. Create your first list to get started.
                      </div>
                    ) : (
                      contactLists.map((list) => (
                        <div
                          key={list.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-500 mr-3" />
                            <div>
                              <h3 className="font-medium">{list.name}</h3>
                              <p className="text-sm text-gray-500">{list.count} contacts</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Export
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setActiveTab("compose")
                                setPhoneNumbers(`[Contact List: ${list.name}]`)
                              }}
                            >
                              Use
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Import Contacts</CardTitle>
                  <CardDescription>Add contacts from a CSV file or manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Import from CSV
                  </Button>

                  <div className="text-center text-sm text-gray-500">or</div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-phone">Add Manually</Label>
                    <div className="flex space-x-2">
                      <Input id="manual-phone" placeholder="Phone number" />
                      <Button>Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>SMS Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Keep it concise</h3>
                    <p className="text-sm text-gray-600">
                      SMS messages are limited to 160 characters. Keep your message clear and to the point.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Include a call to action</h3>
                    <p className="text-sm text-gray-600">
                      Always include a clear call to action and a way for customers to respond or engage.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Respect opt-out requests</h3>
                    <p className="text-sm text-gray-600">
                      Always provide a way for recipients to opt out of future messages.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>SMS Campaign History</CardTitle>
              <CardDescription>View and analyze your past SMS campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="text-center py-8">Loading campaigns...</div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No campaigns found. Send your first SMS campaign to get started.
                </div>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Campaign Name</th>
                        <th className="py-3 px-4 text-left font-medium">Recipients</th>
                        <th className="py-3 px-4 text-left font-medium">Delivered</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign, index) => (
                        <tr key={campaign._id} className={index !== campaigns.length - 1 ? "border-b" : ""}>
                          <td className="py-3 px-4">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{campaign.name}</td>
                          <td className="py-3 px-4">{campaign.recipients}</td>
                          <td className="py-3 px-4">
                            {campaign.delivered} ({Math.round((campaign.delivered / campaign.recipients) * 100)}%)
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={campaign.status === "sent" ? "success" : "warning"}
                              className={
                                campaign.status === "sent" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                              }
                            >
                              {campaign.status === "scheduled"
                                ? "Scheduled"
                                : campaign.status === "sent"
                                  ? "Completed"
                                  : campaign.status === "failed"
                                    ? "Failed"
                                    : "Draft"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <BarChart2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Resend
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{campaignStats.recipients || 0}</div>
                <p className="text-sm text-gray-500 mt-1">Across all campaigns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Delivery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {campaignStats.recipients
                    ? Math.round((campaignStats.delivered / campaignStats.recipients) * 100)
                    : 0}
                  %
                </div>
                <p className="text-sm text-gray-500 mt-1">Average across all campaigns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {campaignStats.delivered ? Math.round((campaignStats.opened / campaignStats.delivered) * 100) : 0}%
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on link clicks and replies</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
