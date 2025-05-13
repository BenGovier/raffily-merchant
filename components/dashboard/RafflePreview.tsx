"use client"

import { useState, useEffect } from "react"
import { Award, Users, ChevronRight, Ticket, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Unsplash image type
type UnsplashImage = {
  id: string
  urls: {
    regular: string
    small: string
    thumb: string
  }
  user: {
    name: string
    username: string
  }
  alt_description: string
}

interface RafflePreviewProps {
  formData: {
    mainPrize: string
    reason: string
    duration: string
    images: string[]
    imageUrls: string[]
    websiteLink: string
    dataQuestions: { question: string; required: boolean }[]
    unsplashImage?: UnsplashImage | null
  }
}

export function RafflePreview({ formData }: RafflePreviewProps) {
  const [showThankYou, setShowThankYou] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: Number.parseInt(formData.duration) || 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [answers, setAnswers] = useState<string[]>([])

  // Update countdown timer when duration changes
  useEffect(() => {
    setTimeLeft({
      days: Number.parseInt(formData.duration) || 7,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  }, [formData.duration])

  // Reset answers when questions change
  useEffect(() => {
    setAnswers(new Array(formData.dataQuestions.length).fill(""))
  }, [formData.dataQuestions.length])

  // Handle entering the raffle
  const handleEnterRaffle = () => {
    setShowThankYou(true)
  }

  // Handle next button click
  const handleNextClick = () => {
    // In a real implementation, this would redirect to the merchant website
    alert(`This would redirect to: ${formData.websiteLink || "https://merchant-website.com"}`)
  }

  // Handle answer change
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  return (
    <Card className="border-t-4 border-t-[#FD8E8E] sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-[#00B8A9]" />
          Live Preview
        </h2>

        {!showThankYou ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {/* Image Preview */}
            <div className="relative h-48 w-full bg-gray-100">
              {formData.imageUrls && formData.imageUrls.length > 0 ? (
                <>
                  <img
                    src={formData.imageUrls[currentImageIndex] || "/placeholder.svg"}
                    alt={`Raffle image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-2"
                  />

                  {/* Unsplash credit if applicable */}
                  {formData.unsplashImage && formData.imageUrls[currentImageIndex].includes("unsplash.com") && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1">
                      <p className="text-[8px] text-white truncate">
                        Photo by {formData.unsplashImage.user.name} on Unsplash
                      </p>
                    </div>
                  )}

                  {/* Image navigation */}
                  {formData.imageUrls.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                      <div className="bg-black/50 rounded-full px-3 py-1 flex space-x-2">
                        {formData.imageUrls.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-gray-400"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4 h-full flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Upload an image to preview</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 bg-white">
              <h3 className="text-lg font-bold">
                {formData.mainPrize ? `Win ${formData.mainPrize}!` : "Win an Amazing Prize!"}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {formData.reason || "Enter our raffle for a chance to win great prizes"}
              </p>

              <div className="mt-4 space-y-3">
                {/* Countdown Timer */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500 mb-2">Raffle ends in:</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white p-2 rounded-md border border-gray-200">
                      <div className="text-xl font-bold text-[#00B8A9]">{timeLeft.days}</div>
                      <div className="text-xs text-gray-500">Days</div>
                    </div>
                    <div className="bg-white p-2 rounded-md border border-gray-200">
                      <div className="text-xl font-bold text-[#00B8A9]">00</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div className="bg-white p-2 rounded-md border border-gray-200">
                      <div className="text-xl font-bold text-[#00B8A9]">00</div>
                      <div className="text-xs text-gray-500">Mins</div>
                    </div>
                    <div className="bg-white p-2 rounded-md border border-gray-200">
                      <div className="text-xl font-bold text-[#00B8A9]">00</div>
                      <div className="text-xs text-gray-500">Secs</div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 mr-1 text-[#00B8A9]" />
                    <span className="font-medium text-sm">Your Information</span>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input placeholder="First Name" className="text-xs h-8" disabled />
                      </div>
                      <div>
                        <Input placeholder="Last Name" className="text-xs h-8" disabled />
                      </div>
                    </div>
                    <Input placeholder="Email Address" className="text-xs h-8" disabled />
                    <Input placeholder="Mobile Number" className="text-xs h-8" disabled />
                  </div>
                </div>

                {/* Data Questions */}
                {formData.dataQuestions.some((q) => q.question) && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 mr-1 text-[#00B8A9]" />
                      <span className="font-medium text-sm">Questions</span>
                    </div>
                    <div className="space-y-2">
                      {formData.dataQuestions.map(
                        (q, index) =>
                          q.question && (
                            <div key={index} className="space-y-1">
                              <div className="flex items-start">
                                <div className="min-w-5 mr-2 text-xs bg-[#00B8A9] text-white rounded-full h-5 w-5 flex items-center justify-center mt-0.5">
                                  {index + 1}
                                </div>
                                <p className="text-xs text-gray-700">{q.question}</p>
                              </div>
                              <Input
                                placeholder="Your answer"
                                className="text-xs h-8 ml-7"
                                value={answers[index] || ""}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                disabled
                              />
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Button
                  className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white"
                  size="sm"
                  onClick={handleEnterRaffle}
                >
                  Enter Raffle
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="p-6 bg-white">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B8A9]/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-[#00B8A9]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-sm text-gray-600 mb-6">Your entry has been successfully submitted.</p>

                {/* Raffle Ticket */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 mx-auto max-w-xs">
                  <div className="flex items-center justify-center mb-2">
                    <Ticket className="h-5 w-5 mr-2 text-[#00B8A9]" />
                    <span className="font-medium">Your Raffle Ticket</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-xs text-gray-500 mb-1">Ticket Number</p>
                    <p className="text-lg font-mono font-bold tracking-wider">
                      {Math.floor(10000000 + Math.random() * 90000000).toString()}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Keep this number for your reference</p>
                </div>

                <Button
                  className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white flex items-center justify-center"
                  onClick={handleNextClick}
                >
                  Continue to Website
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-blue-50 p-3 rounded-md">
          <p className="text-xs text-blue-700">
            {!showThankYou
              ? "This is how your raffle will appear to participants. The actual appearance may vary slightly based on device and platform."
              : "This is the thank you screen participants will see after entering the raffle."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

