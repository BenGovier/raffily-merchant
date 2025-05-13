"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw, ChevronLeft, ChevronRight, Smartphone } from "lucide-react"
import { AILoadingAnimation } from "./AILoadingAnimation"

// Sample subject lines for different prize types
const sampleSubjectLines = {
  iPhone: [
    "🎁 Win the Latest iPhone! Limited Time Raffle Ending Soon",
    "Your Chance to Win an iPhone - Enter Our Exclusive Raffle Today!",
    "Don't Miss Out! iPhone Giveaway - Just Hours Left to Enter",
  ],
  Vacation: [
    "✈️ Dream Vacation Giveaway - Enter Now Before Time Runs Out!",
    "Win a Luxury Getaway! Our Vacation Raffle Closes Tomorrow",
    "Escape to Paradise - Last Chance to Win Our Vacation Package",
  ],
  Car: [
    "🚗 Drive Away in a New Car! Enter Our Exclusive Raffle Today",
    "Win Your Dream Car - Limited Tickets Remaining in Our Raffle",
    "Last Chance: Enter to Win a Brand New Car in Our Luxury Raffle",
  ],
  "Gift Card": [
    "💳 Win a $500 Gift Card - Enter Our Raffle Before It's Too Late!",
    "Shopping Spree Alert! Win a Gift Card in Our Exclusive Raffle",
    "Double Your Chances Today! Gift Card Raffle Ending Soon",
  ],
  default: [
    "🎉 Don't Miss Your Chance to Win Big in Our Exclusive Raffle!",
    "Limited Time Offer: Enter Our Raffle for a Chance to Win Amazing Prizes",
    "Last Call! Our Raffle is Ending Soon - Enter Now to Win",
  ],
}

export function SubjectLineGenerator() {
  const [prizeName, setPrizeName] = useState("")
  const [subjectLines, setSubjectLines] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)

  const generateSubjectLines = async () => {
    if (!prizeName.trim()) {
      setError("Please enter a prize name")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Try to fetch from the API first
      try {
        const response = await fetch("/api/marketing/generate-subject-lines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prizeName }),
        })

        if (response.ok) {
          const data = await response.json()
          setSubjectLines(data.subjectLines)
          setCurrentPreviewIndex(0)
          setIsLoading(false)
          return
        }
      } catch (apiError) {
        console.error("API error:", apiError)
        // Continue to fallback if API fails
      }

      // Fallback to client-side generation
      console.log("Using fallback subject line generation")

      // Determine which category to use based on the prize name
      let category = "default"
      const lowerPrizeName = prizeName.toLowerCase()

      if (lowerPrizeName.includes("iphone") || lowerPrizeName.includes("phone") || lowerPrizeName.includes("apple")) {
        category = "iPhone"
      } else if (
        lowerPrizeName.includes("vacation") ||
        lowerPrizeName.includes("trip") ||
        lowerPrizeName.includes("holiday") ||
        lowerPrizeName.includes("getaway")
      ) {
        category = "Vacation"
      } else if (
        lowerPrizeName.includes("car") ||
        lowerPrizeName.includes("vehicle") ||
        lowerPrizeName.includes("auto")
      ) {
        category = "Car"
      } else if (
        lowerPrizeName.includes("gift card") ||
        lowerPrizeName.includes("voucher") ||
        lowerPrizeName.includes("certificate")
      ) {
        category = "Gift Card"
      }

      // Get the sample subject lines for the category
      const lines = sampleSubjectLines[category] || sampleSubjectLines.default

      // Customize the subject lines with the prize name if it's not already in the category
      if (category === "default") {
        setSubjectLines(lines.map((line) => line.replace("Amazing Prizes", prizeName)))
      } else {
        setSubjectLines(lines)
      }

      setCurrentPreviewIndex(0)
      setIsLoading(false)
    } catch (error) {
      console.error("Error generating subject lines:", error)
      setError("Failed to generate subject lines. Please try again.")
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const nextPreview = () => {
    if (subjectLines.length > 0) {
      setCurrentPreviewIndex((prev) => (prev + 1) % subjectLines.length)
    }
  }

  const prevPreview = () => {
    if (subjectLines.length > 0) {
      setCurrentPreviewIndex((prev) => (prev - 1 + subjectLines.length) % subjectLines.length)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Email Subject Line Generator</h3>
        <p className="text-sm text-gray-500">
          Generate compelling subject lines for your raffle emails by entering your prize name below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Enter prize name (e.g., iPhone 15, Luxury Vacation)"
          value={prizeName}
          onChange={(e) => setPrizeName(e.target.value)}
          className="flex-1 border-2 border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9] text-base placeholder:text-gray-400"
        />
        <Button
          onClick={generateSubjectLines}
          disabled={isLoading}
          className="bg-[#2D2A4A] hover:bg-[#3D3A5A] text-white font-medium px-6 py-2 shadow-sm"
        >
          {isLoading ? "Generating..." : "Generate Subject Lines"}
        </Button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium mt-2">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <AILoadingAnimation />
        </div>
      ) : (
        subjectLines.length > 0 && (
          <div className="space-y-6">
            {/* Mobile Preview */}
            <div className="flex flex-col items-center space-y-4">
              <h4 className="font-medium">Mobile Preview</h4>
              <div className="relative w-full max-w-xs">
                <div className="border-4 border-gray-800 rounded-[32px] p-2 bg-gray-800 shadow-lg mx-auto">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-lg z-10"></div>
                  <div className="bg-white rounded-[24px] overflow-hidden">
                    {/* Phone Header */}
                    <div className="bg-gray-100 p-3 border-b">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2 text-gray-500" />
                        <div className="text-xs font-medium">Email App</div>
                      </div>
                    </div>

                    {/* Email Preview */}
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#2D2A4A] flex items-center justify-center text-white text-xs">
                          R
                        </div>
                        <div className="ml-2">
                          <div className="text-xs font-medium">Raffily</div>
                          <div className="text-xs text-gray-500">today</div>
                        </div>
                      </div>

                      <div className="font-medium text-sm mb-2">{subjectLines[currentPreviewIndex]}</div>

                      <div className="text-xs text-gray-500 line-clamp-2">
                        Enter our exclusive raffle today for your chance to win amazing prizes! Limited time offer,
                        don't miss out...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={prevPreview} disabled={subjectLines.length <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-gray-500">
                    {currentPreviewIndex + 1} of {subjectLines.length}
                  </div>
                  <Button variant="outline" size="sm" onClick={nextPreview} disabled={subjectLines.length <= 1}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Subject Line List */}
            <div>
              <h4 className="font-medium mb-3">Generated Subject Lines:</h4>
              <div className="space-y-3">
                {subjectLines.map((line, index) => (
                  <Card
                    key={index}
                    className={
                      index === currentPreviewIndex ? "border-[#2D2A4A] border-2 shadow-md" : "border-gray-200 border"
                    }
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <p className="text-sm font-medium">{line}</p>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPreviewIndex(index)}
                          title="Preview"
                          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                          Preview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(line)}
                          title="Copy to clipboard"
                          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={generateSubjectLines} className="flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

