"use client"

import type React from "react"

import { useState, useEffect, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Plus,
  Trash2,
  Upload,
  Info,
  Check,
  HelpCircle,
  X,
  Search,
  Loader2,
  Save,
  Calendar,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { RafflePreview } from "@/components/dashboard/RafflePreview"
import { useAuth } from "@/contexts/auth-context"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { AddCardModal } from "@/components/billing/AddCardModal"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

// This is a simplified version of the page component
export default function CreateRaffle() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [formData, setFormData] = useState({
    mainPrize: "",
    reason: "",
    duration: "7",
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    maxTickets: "1000", // Add this new field with default value
    images: [],
    websiteLink: "",
    dataQuestions: [{ question: "", required: true }],
    termsAgreed: false,
    paymentAgreed: false,
  })
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  // Unsplash related states
  const [unsplashImage, setUnsplashImage] = useState<UnsplashImage | null>(null)
  const [isLoadingUnsplash, setIsLoadingUnsplash] = useState(false)
  const [unsplashQuery, setUnsplashQuery] = useState("prize")
  const [showUnsplashSearch, setShowUnsplashSearch] = useState(false)
  const [unsplashResults, setUnsplashResults] = useState<UnsplashImage[]>([])
  const [showCardModal, setShowCardModal] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false) // Default to true for demo accounts

  // Unsplash API credentials
  const UNSPLASH_ACCESS_KEY = "U83GOeRBJkI08D4FhKShZyxh3b_siNhiW7Nj0hq8p-c"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...formData.dataQuestions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setFormData((prev) => ({ ...prev, dataQuestions: updatedQuestions }))
  }

  const addQuestion = () => {
    if (formData.dataQuestions.length < 2) {
      setFormData((prev) => ({
        ...prev,
        dataQuestions: [...prev.dataQuestions, { question: "", required: true }],
      }))
    }
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = formData.dataQuestions.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, dataQuestions: updatedQuestions }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const fileNames = files.map((file) => file.name)

      // Create object URLs for the images
      const urls = files.map((file) => URL.createObjectURL(file))
      setImageUrls((prev) => [...prev, ...urls])

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileNames],
      }))

      // Clear Unsplash image when user uploads their own
      setUnsplashImage(null)
    }
  }

  const removeImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imageUrls[index])

    setImageUrls((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Search for images from Unsplash
  const searchUnsplashImages = async () => {
    if (!unsplashQuery.trim()) return

    setIsLoadingUnsplash(true)
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(unsplashQuery)}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch images from Unsplash")
      }

      const data = await response.json()
      setUnsplashResults(data.results)
    } catch (error) {
      console.error("Error searching Unsplash images:", error)
    } finally {
      setIsLoadingUnsplash(false)
    }
  }

  const selectUnsplashImage = (image: UnsplashImage) => {
    setUnsplashImage(image)

    // Add the Unsplash image to the form data
    const imageUrl = image.urls.regular
    const imageName = `unsplash-${image.id}.jpg`

    // Clear existing images
    setImageUrls([imageUrl])
    setFormData((prev) => ({
      ...prev,
      images: [imageName],
    }))

    setShowUnsplashSearch(false)
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => {
        // Don't revoke Unsplash URLs
        if (!url.includes("unsplash.com")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  // Handle Enter key press to navigate to next step
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (step < 3) {
        nextStep()
      } else {
        handleSubmitRaffle(e as any)
      }
    }
  }

  // Check if user has payment method on component mount
  useEffect(() => {
    // For demo purposes, check localStorage
    const paymentMethodAdded = localStorage.getItem("hasPaymentMethod") === "true"
    setHasPaymentMethod(paymentMethodAdded)
  }, [])

  // Check if the user has a payment method
  // useEffect(() => {
  //   const checkPaymentMethod = async () => {
  //     // Skip for demo accounts
  //     if (user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")) {
  //       setHasPaymentMethod(true)
  //       return
  //     }

  //     try {
  //       const response = await fetch("/api/billing/has-payment-method")
  //       const data = await response.json()
  //       setHasPaymentMethod(data.hasPaymentMethod)
  //     } catch (error) {
  //       console.error("Error checking payment method:", error)
  //     }
  //   }

  //   if (user) {
  //     checkPaymentMethod()
  //   }
  // }, [user])

  // Save as draft function
  const handleSaveAsDraft = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSavingDraft(true)
    setError(null)
    setErrorDetails(null)

    try {
      // Validate form data
      if (!formData.mainPrize.trim()) {
        setError("Please enter a prize name")
        setIsSavingDraft(false)
        return
      }

      // Calculate end date based on duration and start date
      const endDate = new Date(formData.startDate)
      endDate.setDate(endDate.getDate() + Number.parseInt(formData.duration))

      // Prepare raffle data
      const raffleData = {
        title: formData.mainPrize,
        description: formData.reason,
        prize: formData.mainPrize,
        startDate: formData.startDate,
        endDate,
        status: "draft" as const,
        merchantId: user?.id || "demo-merchant", // Use demo-merchant if no user ID
        image: formData.images.length > 0 ? formData.images[0] : undefined,
        imageUrl: unsplashImage ? unsplashImage.urls.regular : undefined, // Add Unsplash image URL
        unsplashCredit: unsplashImage
          ? {
              name: unsplashImage.user.name,
              username: unsplashImage.user.username,
            }
          : undefined,
        rules: JSON.stringify(formData.dataQuestions),
        termsAndConditions: "Standard terms and conditions apply.",
        maxTickets: Number.parseInt(formData.maxTickets),
      }

      // Check if user is a demo account
      const isDemo =
        user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")

      // Make API request to create raffle
      const response = await fetch("/api/raffles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raffleData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save draft")
      }

      // For demo accounts, pass the new raffle data to the raffles page
      if (isDemo) {
        const newRaffle = {
          id: data.raffle._id || `raffle-${Date.now()}`,
          title: raffleData.title,
          prize: raffleData.prize,
          startDate: raffleData.startDate,
          endDate: raffleData.endDate,
          entries: 0,
          status: "draft",
          url: `https://raffily.com/r/${raffleData.title.toLowerCase().replace(/\s+/g, "-")}`,
        }

        // Store in localStorage for demo accounts
        const storedRaffles = localStorage.getItem("demoRaffles")
        const demoRaffles = storedRaffles ? JSON.parse(storedRaffles) : []
        demoRaffles.unshift(newRaffle)
        localStorage.setItem("demoRaffles", JSON.stringify(demoRaffles))

        // Redirect with success message
        router.push(`/dashboard/raffles?tab=draft&success=Draft saved successfully`)
      } else {
        // Regular redirect for non-demo accounts
        router.push("/dashboard/raffles?tab=draft&success=Draft saved successfully")
      }
    } catch (error: any) {
      console.error("Error saving draft:", error)
      setError("Failed to save draft. Please try again.")
      setErrorDetails(error.message || "Unknown error occurred")
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleSubmitRaffle = (e: React.FormEvent) => {
    e.preventDefault()

    // If no payment method, show modal
    if (!hasPaymentMethod) {
      setShowCardModal(true)
      return
    }

    // Otherwise proceed with raffle creation
    handleSubmit(e)
  }

  const handleCreateRaffle = async () => {
    // Simulate successful raffle creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to success page
    router.push("/dashboard/raffles/thank-you")
  }

  // Update the handleSubmit function to store the new raffle in localStorage for demo accounts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setErrorDetails(null)

    // Check if the user has a payment method
    // if (!hasPaymentMethod) {
    //   setShowCardModal(true)
    //   setIsSubmitting(false)
    //   return
    // }

    try {
      // Validate form data
      if (!formData.mainPrize.trim()) {
        setError("Please enter a prize name")
        setIsSubmitting(false)
        return
      }

      if (!formData.termsAgreed || !formData.paymentAgreed) {
        setError("Please agree to the terms and conditions")
        setIsSubmitting(false)
        return
      }

      // Calculate end date based on duration and start date
      const endDate = new Date(formData.startDate)
      endDate.setDate(endDate.getDate() + Number.parseInt(formData.duration))

      // Check if start date is in the future
      const now = new Date()
      const isScheduled = formData.startDate > now

      // Prepare raffle data
      const raffleData = {
        title: formData.mainPrize,
        description: formData.reason,
        prize: formData.mainPrize,
        startDate: formData.startDate,
        endDate,
        status: isScheduled ? "scheduled" : ("pending" as const),
        merchantId: user?.id || "demo-merchant", // Use demo-merchant if no user ID
        image: formData.images.length > 0 ? formData.images[0] : undefined,
        imageUrl: unsplashImage ? unsplashImage.urls.regular : undefined, // Add Unsplash image URL
        unsplashCredit: unsplashImage
          ? {
              name: unsplashImage.user.name,
              username: unsplashImage.user.username,
            }
          : undefined,
        rules: JSON.stringify(formData.dataQuestions),
        termsAndConditions: "Standard terms and conditions apply.",
        maxTickets: Number.parseInt(formData.maxTickets),
      }

      // Check if user is a demo account
      const isDemo =
        user?.email === "demo@example.com" || user?.email === "ben@raffily.com" || user?.id?.includes("demo")

      // Make API request to create raffle
      const response = await fetch("/api/raffles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raffleData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create raffle")
      }

      // For demo accounts, pass the new raffle data to the raffles page
      if (isDemo) {
        const newRaffle = {
          id: data.raffle._id || `raffle-${Date.now()}`,
          title: raffleData.title,
          prize: raffleData.prize,
          startDate: raffleData.startDate,
          endDate: raffleData.endDate,
          entries: 0,
          status: isScheduled ? "scheduled" : "pending",
          url: `https://raffily.com/r/${raffleData.title.toLowerCase().replace(/\s+/g, "-")}`,
        }

        // Store in localStorage for demo accounts
        const storedRaffles = localStorage.getItem("demoRaffles")
        const demoRaffles = storedRaffles ? JSON.parse(storedRaffles) : []
        demoRaffles.unshift(newRaffle)
        localStorage.setItem("demoRaffles", JSON.stringify(demoRaffles))

        // Redirect with the new raffle data
        router.push(`/dashboard/raffles/thank-you?newRaffle=${encodeURIComponent(JSON.stringify(newRaffle))}`)
      } else {
        // Regular redirect for non-demo accounts
        router.push("/dashboard/raffles/thank-you")
      }
    } catch (error: any) {
      console.error("Error creating raffle:", error)
      setError("Failed to create raffle. Please try again.")
      setErrorDetails(error.message || "Unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    setHasPaymentMethod(true)
    setShowCardModal(false)

    // Proceed with raffle creation after payment method added
    handleSubmit(new Event("submit") as any)
  }

  // Handle successful card addition
  // const handleCardSuccess = () => {
  //   setHasPaymentMethod(true)
  //   // Continue with raffle creation
  //   handleSubmit(new Event("submit") as any)
  // }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create a New Raffle</h1>
        <p className="text-gray-600 mt-1">Fill out the form below to create your raffle campaign.</p>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 border border-red-200 text-red-600">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            {error}
            {errorDetails && (
              <div className="mt-2 text-sm text-red-500">
                <details>
                  <summary>Error details</summary>
                  <p className="mt-1">{errorDetails}</p>
                </details>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? "bg-[#00B8A9] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
              <span className="text-xs mt-2 text-gray-500">
                {i === 1 ? "Raffle Details" : i === 2 ? "Data & Images" : "Review & Submit"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#00B8A9] rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmitRaffle}>
            {step === 1 && (
              <Card className="border-2 border-gray-200 shadow-md">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-xl text-gray-800">Raffle Details</CardTitle>
                  <CardDescription className="text-gray-600">
                    Tell us about your raffle and the prize you're offering.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainPrize" className="text-base font-medium text-gray-700">
                      What is the main prize? <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mainPrize"
                      name="mainPrize"
                      value={formData.mainPrize}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., iPhone 13 Pro, $500 Gift Card"
                      className="border-2 border-gray-300 h-12 text-base focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-base font-medium text-gray-700">
                      Why are you giving it away? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          nextStep()
                        }
                      }}
                      placeholder="Explain the purpose of your raffle (max 500 words)"
                      className="border-2 border-gray-300 min-h-[120px] text-base focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      rows={4}
                      maxLength={500}
                      required
                    />
                    <p className="text-sm text-gray-500">{formData.reason.length}/500 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-base font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal border-2 border-gray-300 h-12 text-base focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => date && setFormData((prev) => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date() > formData.startDate
                        ? "Raffle will start immediately after approval"
                        : "Raffle will be scheduled to start on this date"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-base font-medium text-gray-700">
                      How long should the raffle be available online? <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="w-full h-12 rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-[#00B8A9] focus:outline-none focus:ring-[#00B8A9]"
                      required
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="21">21 days</option>
                      <option value="30">30 days</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTickets" className="text-base font-medium text-gray-700">
                      Maximum number of tickets <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="maxTickets"
                      name="maxTickets"
                      type="number"
                      min="10"
                      value={formData.maxTickets}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., 1000"
                      className="border-2 border-gray-300 h-12 text-base focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      required
                    />
                    <p className="text-sm text-gray-500">Set a limit on how many entries your raffle can receive</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end bg-gray-50 border-t border-gray-200 py-4">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white h-12 px-6 text-base font-medium"
                  >
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-2 border-gray-200 shadow-md">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-xl text-gray-800">Data Capture Questions</CardTitle>
                  <CardDescription className="text-gray-600">
                    Set up your data capture questions (max 2).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-medium text-gray-700">Data Capture Questions</Label>
                      <Button
                        type="button"
                        onClick={addQuestion}
                        variant="outline"
                        size="sm"
                        className="text-[#00B8A9] border-2 border-[#00B8A9] hover:bg-[#00B8A9]/10"
                        disabled={formData.dataQuestions.length >= 2}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Question
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {formData.dataQuestions.map((q, index) => (
                        <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
                            {index > 0 && (
                              <Button
                                type="button"
                                onClick={() => removeQuestion(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-500 h-8 px-2 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor={`question-${index}`} className="text-sm font-medium text-gray-700">
                                Question Text <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id={`question-${index}`}
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g., What month does your home insurance renew?"
                                className="mt-1 border-2 border-gray-300 focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                                required={q.required}
                              />
                            </div>
                            <div className="flex items-center bg-gray-50 p-2 rounded-md">
                              <input
                                id={`required-${index}`}
                                type="checkbox"
                                checked={q.required}
                                onChange={(e) => handleQuestionChange(index, "required", e.target.checked)}
                                className="h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded"
                              />
                              <label htmlFor={`required-${index}`} className="ml-2 block text-sm text-gray-700">
                                Required question
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex items-start p-3 bg-blue-50 rounded-md">
                      <HelpCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        You can add up to 2 questions to gather insights from participants. At least one question is
                        required.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="websiteLink" className="text-base font-medium text-gray-700">
                      Website Link <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="websiteLink"
                      name="websiteLink"
                      type="url"
                      value={formData.websiteLink}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder="https://your-website.com"
                      className="border-2 border-gray-300 h-12 text-base focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Users will be redirected to this link after entering the raffle.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="images" className="text-base font-medium text-gray-700">
                      Upload Images
                    </Label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                        <p className="text-xs text-gray-500 mb-4">Upload your business logo and images of the prizes</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Input
                              id="images"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("images")?.click()}
                              className="text-[#00B8A9] border-2 border-[#00B8A9] hover:bg-[#00B8A9]/10 w-full h-10 font-medium"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Files
                            </Button>
                          </div>
                          <div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowUnsplashSearch(true)}
                              className="text-[#00B8A9] border-2 border-[#00B8A9] hover:bg-[#00B8A9]/10 w-full h-10 font-medium"
                            >
                              <Search className="h-4 w-4 mr-2" />
                              Unsplash
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Unsplash search modal */}
                    {showUnsplashSearch && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                          <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-medium">Search Unsplash Images</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowUnsplashSearch(false)}>
                              ✕
                            </Button>
                          </div>

                          <div className="p-4 border-b">
                            <div className="flex gap-2">
                              <Input
                                value={unsplashQuery}
                                onChange={(e) => setUnsplashQuery(e.target.value)}
                                placeholder="Search for images..."
                                className="border-2 border-gray-300"
                                onKeyDown={(e) => e.key === "Enter" && searchUnsplashImages()}
                              />
                              <Button
                                onClick={searchUnsplashImages}
                                disabled={isLoadingUnsplash}
                                className="bg-[#00B8A9] hover:bg-[#00B8A9]/90"
                              >
                                {isLoadingUnsplash ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                              </Button>
                            </div>
                          </div>

                          <div className="flex-grow overflow-y-auto p-4">
                            {isLoadingUnsplash ? (
                              <div className="flex items-center justify-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                              </div>
                            ) : unsplashResults.length > 0 ? (
                              <div className="grid grid-cols-3 gap-3">
                                {unsplashResults.map((image) => (
                                  <div
                                    key={image.id}
                                    className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-2 border-transparent hover:border-[#00B8A9]"
                                    onClick={() => selectUnsplashImage(image)}
                                  >
                                    <img
                                      src={image.urls.small || "/placeholder.svg"}
                                      alt={image.alt_description || "Unsplash image"}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-gray-500 py-10">
                                {unsplashQuery
                                  ? "No images found. Try a different search term."
                                  : "Search for images to use as your background."}
                              </div>
                            )}
                          </div>

                          <div className="p-4 border-t text-xs text-gray-500">
                            Images provided by{" "}
                            <a
                              href="https://unsplash.com/?utm_source=raffily&utm_medium=referral"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              Unsplash
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {imageUrls.length > 0 && (
                      <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                        <p className="text-sm font-medium mb-2 text-gray-700">Selected Images:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {imageUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative rounded-md overflow-hidden h-24 border-2 border-gray-200"
                            >
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>

                              {/* Show Unsplash credit if applicable */}
                              {unsplashImage && url.includes("unsplash.com") && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1">
                                  <p className="text-[8px] text-white truncate">
                                    Photo by {unsplashImage.user.name} on Unsplash
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 border-t border-gray-200 py-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="border-2 border-gray-300 h-12 px-6 text-base font-medium"
                  >
                    Previous Step
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white h-12 px-6 text-base font-medium"
                  >
                    Next Step
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-2 border-gray-200 shadow-md">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-xl text-gray-800">Review & Submit</CardTitle>
                  <CardDescription className="text-gray-600">
                    Review your raffle details and agree to the terms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">Raffle Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Main Prize</p>
                          <p className="text-sm text-gray-800 font-medium">{formData.mainPrize}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Duration</p>
                          <p className="text-sm text-gray-800 font-medium">{formData.duration} days</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Start Date</p>
                          <p className="text-sm text-gray-800 font-medium">{format(formData.startDate, "PPP")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">End Date</p>
                          <p className="text-sm text-gray-800 font-medium">
                            {format(
                              new Date(
                                new Date(formData.startDate).setDate(
                                  formData.startDate.getDate() + Number.parseInt(formData.duration),
                                ),
                              ),
                              "PPP",
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Maximum Tickets</p>
                          <p className="text-sm text-gray-800 font-medium">{formData.maxTickets}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Reason</p>
                          <p className="text-sm text-gray-800">{formData.reason}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Website Link</p>
                          <p className="text-sm text-gray-800 break-all">{formData.websiteLink}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">Data Capture Questions</h3>
                      <div className="space-y-2">
                        {formData.dataQuestions.map(
                          (q, index) =>
                            q.question && (
                              <div key={index} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                                <p className="text-sm font-medium text-gray-800">
                                  Question {index + 1}: {q.question}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {q.required ? <span className="text-red-500 font-medium">Required</span> : "Optional"}
                                </p>
                              </div>
                            ),
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-2">Images</h3>
                      {imageUrls.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {imageUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative rounded-md overflow-hidden h-24 border-2 border-gray-200"
                            >
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />

                              {/* Show Unsplash credit if applicable */}
                              {unsplashImage && url.includes("unsplash.com") && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1">
                                  <p className="text-[8px] text-white truncate">
                                    Photo by {unsplashImage.user.name} on Unsplash
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No images uploaded</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start p-3 bg-white border-2 border-gray-200 rounded-md">
                      <input
                        id="termsAgreed"
                        name="termsAgreed"
                        type="checkbox"
                        checked={formData.termsAgreed}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded mt-0.5"
                        required
                      />
                      <label htmlFor="termsAgreed" className="ml-3 block text-sm text-gray-700">
                        I have read and understood the{" "}
                        <Link href="/terms" className="text-[#00B8A9] hover:underline font-medium">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-start p-3 bg-white border-2 border-gray-200 rounded-md">
                      <input
                        id="paymentAgreed"
                        name="paymentAgreed"
                        type="checkbox"
                        checked={formData.paymentAgreed}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded mt-0.5"
                        required
                      />
                      <label htmlFor="paymentAgreed" className="ml-3 block text-sm text-gray-700">
                        I confirm that we will pay a maximum of £0.75 per ticket issued
                      </label>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-start border-2 border-blue-100">
                      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Your raffle will be reviewed by our team and will be approved within 24 hours. You'll receive an
                        email notification once it's live.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 border-t border-gray-200 py-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-2 border-gray-300 h-12 px-6 text-base font-medium"
                    >
                      Previous Step
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSaveAsDraft}
                      variant="outline"
                      className="border-2 border-[#00B8A9] text-[#00B8A9] hover:bg-[#00B8A9]/10 h-12 px-6 text-base font-medium"
                      disabled={isSavingDraft}
                    >
                      {isSavingDraft ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save as Draft
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white h-12 px-6 text-base font-medium"
                    disabled={isSubmitting || !formData.termsAgreed || !formData.paymentAgreed}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Raffle"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-1/3">
          <RafflePreview formData={{ ...formData, imageUrls, unsplashImage }} />
        </div>
      </div>
      {/* Add Card Modal */}
      <AddCardModal isOpen={showCardModal} onClose={() => setShowCardModal(false)} onSuccess={handlePaymentSuccess} />
    </div>
  )
}
