"use client"

import { useState, useEffect } from "react"
import {
  Gift,
  Upload,
  LinkIcon,
  ChevronRight,
  ChevronLeft,
  Check,
  Award,
  Users,
  Trophy,
  ChevronDown,
  X,
  ChevronUp,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import React from "react"

const steps = [
  {
    id: "choose",
    title: "Choose a Prize",
    description: "Select an attractive prize that will appeal to your target audience.",
    icon: Gift,
    color: "bg-pink-100 text-pink-600",
    details: [
      "Higher value prizes typically generate more engagement",
      "Consider your audience's interests and preferences",
      "Physical products, gift cards, and experiences all work well",
      "Showcase the prize with high-quality images",
    ],
  },
  {
    id: "upload",
    title: "Upload Your Raffle",
    description: "Create and customize your raffle in just a few minutes.",
    icon: Upload,
    color: "bg-blue-100 text-blue-600",
    details: [
      "Add your branding and customize the look and feel",
      "Set the duration and entry requirements",
      "Add data capture questions to learn more about participants",
      "Preview how your raffle will look before publishing",
    ],
  },
  {
    id: "share",
    title: "Share Your Link",
    description: "Send your unique raffle link to customers through email, social media, or your website.",
    icon: LinkIcon,
    color: "bg-green-100 text-green-600",
    details: [
      "Each raffle gets a unique, shareable link",
      "Embed on your website or share via email campaigns",
      "Post on social media to maximize reach",
      "Track clicks and engagement in real-time",
    ],
  },
  {
    id: "engage",
    title: "Engage Customers",
    description: "Watch as participants enter your raffle and engage with your brand.",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    details: [
      "Participants provide their contact information",
      "Answer your custom questions for valuable insights",
      "Easily share with friends to increase your reach",
      "Build your marketing database with qualified leads",
    ],
  },
  {
    id: "winner",
    title: "Select a Winner",
    description: "Automatically select a winner when the raffle ends and notify them instantly.",
    icon: Trophy,
    color: "bg-amber-100 text-amber-600",
    details: [
      "Fair and transparent winner selection",
      "Automatic winner notification via email",
      "Option to manually select winners if needed",
      "Announce winners on your social channels to build trust",
    ],
  },
  {
    id: "analyze",
    title: "Analyze Results",
    description: "Review detailed analytics to understand your audience and improve future campaigns.",
    icon: Award,
    color: "bg-teal-100 text-teal-600",
    details: [
      "Comprehensive dashboard with key metrics",
      "Export data for further analysis",
      "Compare performance across multiple raffles",
      "Gain insights to optimize future campaigns",
    ],
  },
]

export function DemoExplainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (index: number) => {
    setCurrentStep(index)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const closeExplainer = () => {
    setIsVisible(false)
    // Store in localStorage so it doesn't show again in this session
    localStorage.setItem("demoExplainerClosed", "true")
  }

  useEffect(() => {
    // Check if the explainer was previously closed
    const wasClosed = localStorage.getItem("demoExplainerClosed") === "true"
    if (wasClosed) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isMinimized ? (
        <div className="w-full max-w-md">
          <div className="border-2 border-[#00B8A9] shadow-lg overflow-hidden rounded-lg bg-white">
            <div className="bg-[#00B8A9] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">How Raffily Works</h3>
              <div className="flex space-x-2">
                <button onClick={toggleMinimize} className="p-1 hover:bg-white/20 rounded" aria-label="Minimize">
                  <ChevronDown className="h-5 w-5" />
                </button>
                <button onClick={closeExplainer} className="p-1 hover:bg-white/20 rounded" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="p-2 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="text-center">
                    <span className="text-sm text-gray-500">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="p-2 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next step"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <div className="text-center mb-6">
                    <div className={cn("inline-flex p-4 rounded-full mb-4", steps[currentStep].color)}>
                      {React.createElement(steps[currentStep].icon, { className: "h-8 w-8" })}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
                    <p className="text-gray-600">{steps[currentStep].description}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {steps[currentStep].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#00B8A9] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center mt-6 space-x-1">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        currentStep === index ? "bg-[#00B8A9] w-6" : "bg-gray-300",
                      )}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Want to see it in action?</p>
                  <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90">
                    <Link href="/dashboard/raffles/new">
                      Create a Raffle
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={toggleMinimize} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 shadow-lg flex items-center">
            <Info className="mr-2 h-4 w-4" />
            How Raffily Works
            <ChevronUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

