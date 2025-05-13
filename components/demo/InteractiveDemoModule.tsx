"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Gift,
  Upload,
  LinkIcon,
  Users,
  Trophy,
  BarChart3,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Mail,
  Share2,
  Smartphone,
  Award,
} from "lucide-react"
import Image from "next/image"

export function InteractiveDemoModule() {
  const [activeTab, setActiveTab] = useState("choose")
  const [demoRaffleName, setDemoRaffleName] = useState("iPhone 15 Pro Giveaway")
  const [demoRaffleDescription, setDemoRaffleDescription] = useState("Enter for a chance to win the latest iPhone!")
  const [demoRaffleLink, setDemoRaffleLink] = useState("raffily.com/r/iphone-15-giveaway")
  const [linkCopied, setLinkCopied] = useState(false)
  const [entries, setEntries] = useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [winnerSelected, setWinnerSelected] = useState(false)
  const [winnerName, setWinnerName] = useState("Sarah Johnson")

  const handleNext = () => {
    const tabs = ["choose", "upload", "share", "engage", "winner", "analyze"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])

      // Special actions for specific tabs
      if (tabs[currentIndex + 1] === "engage") {
        simulateEntries()
      }
    }
  }

  const handlePrevious = () => {
    const tabs = ["choose", "upload", "share", "engage", "winner", "analyze"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${demoRaffleLink}`)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const simulateEntries = () => {
    setEntries(0)
    const interval = setInterval(() => {
      setEntries((prev) => {
        if (prev >= 25) {
          clearInterval(interval)
          return 25
        }
        return prev + 1
      })
    }, 100)
  }

  const selectWinner = () => {
    setWinnerSelected(true)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  // Simplified version without shadcn/ui Card components
  return (
    <div className="w-full max-w-4xl mx-auto shadow-lg border-2 border-[#00B8A9]/20 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/80 text-white p-6 relative">
        <button className="absolute right-4 top-4 text-white/80 hover:text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Interactive Demo: How Raffily Works</h2>
        <p className="text-white/80">
          Follow this interactive guide to understand the Raffily process from start to finish
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="px-6 pt-6">
          <div className="grid grid-cols-6 w-full bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("choose")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "choose" ? "bg-white shadow" : ""}`}
            >
              <Gift className="h-4 w-4" />
              <span className="text-xs">Choose</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "upload" ? "bg-white shadow" : ""}`}
            >
              <Upload className="h-4 w-4" />
              <span className="text-xs">Upload</span>
            </button>
            <button
              onClick={() => setActiveTab("share")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "share" ? "bg-white shadow" : ""}`}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="text-xs">Share</span>
            </button>
            <button
              onClick={() => setActiveTab("engage")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "engage" ? "bg-white shadow" : ""}`}
            >
              <Users className="h-4 w-4" />
              <span className="text-xs">Engage</span>
            </button>
            <button
              onClick={() => setActiveTab("winner")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "winner" ? "bg-white shadow" : ""}`}
            >
              <Trophy className="h-4 w-4" />
              <span className="text-xs">Winner</span>
            </button>
            <button
              onClick={() => setActiveTab("analyze")}
              className={`flex flex-col items-center gap-1 py-3 rounded ${activeTab === "analyze" ? "bg-white shadow" : ""}`}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Analyze</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Choose Tab */}
          {activeTab === "choose" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">1. Choose Your Prize</h3>
                <p className="text-gray-600 mb-4">
                  Select an attractive prize that will appeal to your target audience and align with your business
                  goals.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prize-name">Prize Name</Label>
                    <Input
                      id="prize-name"
                      value={demoRaffleName}
                      onChange={(e) => setDemoRaffleName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="prize-description">Prize Description</Label>
                    <Textarea
                      id="prize-description"
                      value={demoRaffleDescription}
                      onChange={(e) => setDemoRaffleDescription(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Tips for Choosing Prizes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Choose prizes that resonate with your target audience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Higher value prizes typically generate more engagement
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Consider seasonal or trending items to maximize interest
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Prize Preview</h4>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-white border border-gray-200 mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Prize preview"
                    width={500}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-xl">{demoRaffleName || "Your Prize Name"}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {demoRaffleDescription || "Prize description will appear here"}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Prize Value</span>
                    <span className="text-sm font-bold text-gray-800">$999</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Estimated Entries</span>
                    <span className="text-sm font-bold text-gray-800">500-1000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Duration</span>
                    <span className="text-sm font-bold text-gray-800">14 days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">2. Upload Your Raffle</h3>
                <p className="text-gray-600 mb-4">
                  Create and customize your raffle in just a few minutes with our easy-to-use platform.
                </p>

                <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700">Raffle Settings</h4>

                  <div>
                    <Label htmlFor="raffle-duration">Duration</Label>
                    <select id="raffle-duration" className="w-full mt-1 rounded-md border border-gray-300 p-2">
                      <option value="7">7 days</option>
                      <option value="14" selected>
                        14 days
                      </option>
                      <option value="30">30 days</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="raffle-entries">Maximum Entries</Label>
                    <Input id="raffle-entries" type="number" defaultValue="1000" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="raffle-question">Data Capture Question</Label>
                    <Input id="raffle-question" defaultValue="What's your favorite product of ours?" className="mt-1" />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Customization Options:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Add your company logo and branding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Customize form fields and data capture questions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Set entry requirements and terms & conditions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Raffle Preview</h4>
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <div className="bg-[#00B8A9] p-3 text-white">
                    <div className="text-center">
                      <h3 className="font-bold">{demoRaffleName}</h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Prize preview"
                        width={500}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{demoRaffleDescription}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <Label htmlFor="demo-name">Your Name</Label>
                        <Input id="demo-name" placeholder="John Smith" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="demo-email">Email Address</Label>
                        <Input id="demo-email" placeholder="john@example.com" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="demo-question">What's your favorite product of ours?</Label>
                        <Input id="demo-question" placeholder="Your answer" className="mt-1" />
                      </div>
                      <div className="flex items-center mt-2">
                        <input type="checkbox" id="marketing-consent" className="mr-2" defaultChecked />
                        <label htmlFor="marketing-consent" className="text-sm text-gray-600">
                          I agree to receive marketing communications
                        </label>
                      </div>
                    </div>

                    <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90">Enter Raffle</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share Tab */}
          {activeTab === "share" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">3. Share Your Raffle</h3>
                <p className="text-gray-600 mb-4">
                  Send your unique raffle link to customers through email, social media, or your website.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <Label htmlFor="raffle-link">Your Unique Raffle Link</Label>
                    <div className="flex mt-1">
                      <div className="flex-grow relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">https://</span>
                        <Input
                          id="raffle-link"
                          value={demoRaffleLink}
                          onChange={(e) => setDemoRaffleLink(e.target.value)}
                          className="pl-16"
                        />
                      </div>
                      <Button onClick={handleCopyLink} className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-800">
                        {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {linkCopied && <p className="text-xs text-green-600 mt-1">Link copied to clipboard!</p>}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Share Options:</h4>

                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="justify-start">
                        <svg className="h-4 w-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </Button>

                      <Button variant="outline" className="justify-start">
                        <svg className="h-4 w-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        Twitter
                      </Button>

                      <Button variant="outline" className="justify-start">
                        <Mail className="h-4 w-4 mr-2 text-red-500" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Sharing Best Practices:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Include the prize details in your social posts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Send dedicated email campaigns to your subscribers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Add the raffle link to your website homepage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Sharing Preview</h4>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Your Business</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>

                    <p className="text-sm mb-3">
                      🎁 GIVEAWAY! We're giving away a brand new {demoRaffleName}! Click the link below to enter. Good
                      luck!
                    </p>

                    <div className="rounded-lg overflow-hidden border border-gray-200 mb-3">
                      <div className="aspect-video relative bg-gray-100">
                        <Image
                          src="/placeholder.svg?height=300&width=500"
                          alt="Prize preview"
                          width={500}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-500">raffily.com</p>
                        <p className="text-sm font-medium">{demoRaffleName}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{demoRaffleDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <button className="flex items-center mr-4">
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          42
                        </button>
                        <button className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                          </svg>
                          12
                        </button>
                      </div>
                      <div>
                        <button className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-2">Email Template</h5>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        Subject: Win a {demoRaffleName} - Enter Our Giveaway Today!
                      </p>
                      <div className="text-xs text-gray-600 space-y-2">
                        <p>Hi [Customer Name],</p>
                        <p>We're excited to announce our latest giveaway! Enter now for your chance to win:</p>
                        <p className="font-medium">{demoRaffleName}</p>
                        <p>{demoRaffleDescription}</p>
                        <p>Click the button below to enter:</p>
                        <div className="py-2">
                          <button className="bg-[#00B8A9] text-white px-4 py-2 rounded text-sm">Enter Giveaway</button>
                        </div>
                        <p>Good luck!</p>
                        <p>The [Your Business] Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engage Tab */}
          {activeTab === "engage" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">4. Engage Customers</h3>
                <p className="text-gray-600 mb-4">
                  Watch as participants enter your raffle and engage with your brand.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">Live Entries</h4>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Total Entries</span>
                      <span className="text-lg font-bold text-[#00B8A9]">{entries}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#00B8A9] h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${(entries / 100) * 100}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">Goal: 100 entries</p>

                    <Button onClick={simulateEntries} className="w-full mt-3 bg-[#00B8A9] hover:bg-[#00B8A9]/90">
                      Simulate Entries
                    </Button>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">Recent Participants</h4>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          JS
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">John Smith</p>
                          <p className="text-xs text-gray-500">john.s@example.com</p>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">Just now</div>
                      </div>

                      <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                          SD
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Sarah Davis</p>
                          <p className="text-xs text-gray-500">sarah.d@example.com</p>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">2 min ago</div>
                      </div>

                      <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                          MB
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Michael Brown</p>
                          <p className="text-xs text-gray-500">m.brown@example.com</p>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">5 min ago</div>
                      </div>

                      <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-medium">
                          AJ
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">Amanda Johnson</p>
                          <p className="text-xs text-gray-500">amanda.j@example.com</p>
                        </div>
                        <div className="ml-auto text-xs text-gray-500">10 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Engagement Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Build your marketing database with qualified leads</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Gather valuable customer insights through custom questions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        Increase brand awareness as participants share with friends
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Data Collection</h4>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-3">Entry Statistics</h5>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <span className="text-xs text-blue-500 font-medium">Email</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{entries}</p>
                        <p className="text-xs text-gray-500">Collected</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Smartphone className="h-5 w-5 text-green-500" />
                          <span className="text-xs text-green-500 font-medium">Phone</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{Math.floor(entries * 0.8)}</p>
                        <p className="text-xs text-gray-500">Collected</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Marketing Opt-ins</span>
                          <span className="font-medium">
                            {Math.floor(entries * 0.75)}/{entries}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Social Shares</span>
                          <span className="font-medium">
                            {Math.floor(entries * 0.4)}/{entries}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Question Responses</span>
                          <span className="font-medium">
                            {entries}/{entries}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-3">Question Responses</h5>

                    <p className="text-sm text-gray-600 mb-3">"What's your favorite product of ours?"</p>

                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        "I love your premium headphones. Best sound quality ever!"
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        "The wireless earbuds are my favorite. So convenient!"
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        "Your smart speaker has been a game changer for my home."
                      </div>
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        "The noise-cancelling headphones are perfect for travel."
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">View all {entries} responses</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Winner Tab */}
          {activeTab === "winner" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">5. Select a Winner</h3>
                <p className="text-gray-600 mb-4">
                  Automatically select a winner when the raffle ends and notify them instantly.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">Winner Selection</h4>

                    {!winnerSelected ? (
                      <>
                        <p className="text-sm text-gray-600 mb-4">
                          Your raffle has ended. It's time to select a winner from the {entries} entries.
                        </p>

                        <Button onClick={selectWinner} className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90">
                          <Trophy className="mr-2 h-4 w-4" />
                          Select Winner
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="text-center py-4">
                          <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 mb-3">
                            <Trophy className="h-8 w-8" />
                          </div>
                          <h5 className="text-lg font-bold mb-1">Winner Selected!</h5>
                          <p className="text-sm text-gray-600">Congratulations to:</p>
                          <div className="mt-3 p-3 bg-amber-50 rounded-lg inline-block">
                            <p className="font-bold text-gray-800">{winnerName}</p>
                            <p className="text-sm text-gray-600">sarah.j@example.com</p>
                          </div>
                        </div>

                        {showSuccessMessage && (
                          <div className="mt-3 p-2 bg-green-50 text-green-700 text-sm rounded-lg text-center">
                            Winner notification email sent successfully!
                          </div>
                        )}

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" className="flex-1">
                            <Mail className="mr-2 h-4 w-4" />
                            Resend Notification
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Announce Winner
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Winner Selection Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Fair and transparent random selection process</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Automatic winner notification via email</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Option to manually select winners if needed</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Tools to announce winners on your social channels</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Winner Notification</h4>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-2">Email Template</h5>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">
                        Subject: Congratulations! You've Won Our {demoRaffleName} Giveaway!
                      </p>
                      <div className="text-xs text-gray-600 space-y-2">
                        <p>Hi {winnerName},</p>
                        <p>
                          Congratulations! We're thrilled to inform you that you've been selected as the winner of our{" "}
                          {demoRaffleName} giveaway!
                        </p>
                        <p>Prize details:</p>
                        <p className="font-medium">{demoRaffleName}</p>
                        <p>{demoRaffleDescription}</p>
                        <p>
                          To claim your prize, please reply to this email within 7 days with your shipping address and
                          phone number.
                        </p>
                        <p>Thank you for participating in our giveaway!</p>
                        <p>Best regards,</p>
                        <p>The [Your Business] Team</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-2">Social Announcement</h5>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                        <div className="ml-2">
                          <p className="text-xs font-medium">Your Business</p>
                        </div>
                      </div>

                      <p className="text-sm mb-3">
                        🎉 WINNER ANNOUNCEMENT! 🎉 Congratulations to {winnerName} for winning our {demoRaffleName}{" "}
                        giveaway! Thank you to everyone who participated. Stay tuned for our next giveaway coming soon!
                      </p>

                      <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-4">
                            <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                            <p className="font-bold text-lg">Congratulations!</p>
                            <p className="text-sm">{winnerName}</p>
                            <p className="text-xs mt-2">Winner of the {demoRaffleName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Tab */}
          {activeTab === "analyze" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">6. Analyze Results</h3>
                <p className="text-gray-600 mb-4">
                  Review detailed analytics to understand your audience and improve future campaigns.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-3">Campaign Summary</h4>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-500 font-medium">Total Entries</p>
                        <p className="text-2xl font-bold mt-1">{entries}</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-500 font-medium">Conversion Rate</p>
                        <p className="text-2xl font-bold mt-1">42%</p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-500 font-medium">Marketing Opt-ins</p>
                        <p className="text-2xl font-bold mt-1">{Math.floor(entries * 0.75)}</p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs text-amber-500 font-medium">Social Shares</p>
                        <p className="text-2xl font-bold mt-1">{Math.floor(entries * 0.4)}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium mb-2">Traffic Sources</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Social Media</span>
                            <span className="font-medium">45%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Email</span>
                            <span className="font-medium">30%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Website</span>
                            <span className="font-medium">20%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Direct</span>
                            <span className="font-medium">5%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Analytics Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Comprehensive dashboard with key metrics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Export data for further analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Compare performance across multiple raffles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Gain insights to optimize future campaigns</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Audience Insights</h4>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-700 mb-3">Demographics</h5>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h6 className="text-xs font-medium text-gray-500 mb-2">Age Distribution</h6>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>18-24</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>25-34</span>
                              <span className="font-medium">40%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>35-44</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>45+</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "20%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h6 className="text-xs font-medium text-gray-500 mb-2">Gender</h6>
                        <div className="aspect-square relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: "55%" }}></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-3/4 h-3/4 rounded-full overflow-hidden bg-white">
                                <div className="h-full bg-pink-500" style={{ width: "45%" }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-0 w-full flex justify-between text-xs">
                            <span className="text-blue-500 font-medium">Male: 55%</span>
                            <span className="text-pink-500 font-medium">Female: 45%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h6 className="text-xs font-medium text-gray-500 mb-2">Location</h6>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                          <span>New York</span>
                          <span className="font-medium">22%</span>
                        </div>
                        <div className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                          <span>California</span>
                          <span className="font-medium">18%</span>
                        </div>
                        <div className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                          <span>Texas</span>
                          <span className="font-medium">12%</span>
                        </div>
                        <div className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                          <span>Florida</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between text-xs p-1 bg-gray-50 rounded">
                          <span>Other</span>
                          <span className="font-medium">38%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium text-gray-700">Export Options</h5>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          PDF Report
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          CSV Export
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600">
                      Export detailed analytics to share with your team or for further analysis in your preferred tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "choose"}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeTab === "analyze"}
              className="bg-[#00B8A9] hover:bg-[#00B8A9]/90"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
