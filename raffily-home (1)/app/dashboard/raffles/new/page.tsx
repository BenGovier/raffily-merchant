"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, Info, Check, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function CreateRaffle() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    mainPrize: "",
    reason: "",
    additionalPrizes: [{ name: "", description: "" }],
    duration: "7",
    images: [],
    websiteLink: "",
    dataQuestions: [{ question: "", required: true }],
    termsAgreed: false,
    paymentAgreed: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAdditionalPrizeChange = (index: number, field: string, value: string) => {
    const updatedPrizes = [...formData.additionalPrizes]
    updatedPrizes[index] = { ...updatedPrizes[index], [field]: value }
    setFormData((prev) => ({ ...prev, additionalPrizes: updatedPrizes }))
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...formData.dataQuestions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setFormData((prev) => ({ ...prev, dataQuestions: updatedQuestions }))
  }

  const addAdditionalPrize = () => {
    if (formData.additionalPrizes.length < 9) {
      setFormData((prev) => ({
        ...prev,
        additionalPrizes: [...prev.additionalPrizes, { name: "", description: "" }],
      }))
    }
  }

  const addQuestion = () => {
    if (formData.dataQuestions.length < 5) {
      setFormData((prev) => ({
        ...prev,
        dataQuestions: [...prev.dataQuestions, { question: "", required: true }],
      }))
    }
  }

  const removeAdditionalPrize = (index: number) => {
    const updatedPrizes = formData.additionalPrizes.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, additionalPrizes: updatedPrizes }))
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = formData.dataQuestions.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, dataQuestions: updatedQuestions }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would handle file uploads to a storage service
    // For this demo, we'll just store the file names
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map((file) => file.name)
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...fileNames] }))
    }
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, you would submit the form data to your backend
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    router.push("/dashboard/raffles/thank-you")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create a New Raffle</h1>
        <p className="text-gray-600 mt-1">Fill out the form below to create your raffle campaign.</p>
      </div>

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

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Raffle Details</CardTitle>
              <CardDescription>Tell us about your raffle and the prizes you're offering.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="mainPrize" className="text-base">
                  What is the main prize?
                </Label>
                <Input
                  id="mainPrize"
                  name="mainPrize"
                  value={formData.mainPrize}
                  onChange={handleChange}
                  placeholder="e.g., iPhone 13 Pro, $500 Gift Card"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="reason" className="text-base">
                  Why are you giving it away?
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Explain the purpose of your raffle (max 500 words)"
                  className="mt-1"
                  rows={4}
                  maxLength={500}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.reason.length}/500 characters</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base">Do you want to add smaller prizes?</Label>
                  <Button
                    type="button"
                    onClick={addAdditionalPrize}
                    variant="outline"
                    size="sm"
                    className="text-[#00B8A9]"
                    disabled={formData.additionalPrizes.length >= 9}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Prize
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.additionalPrizes.map((prize, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Additional Prize {index + 1}</h4>
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => removeAdditionalPrize(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 h-8 px-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`prize-name-${index}`} className="text-sm">
                            Prize Name
                          </Label>
                          <Input
                            id={`prize-name-${index}`}
                            value={prize.name}
                            onChange={(e) => handleAdditionalPrizeChange(index, "name", e.target.value)}
                            placeholder="e.g., Runner-up Prize"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`prize-desc-${index}`} className="text-sm">
                            Prize Description
                          </Label>
                          <Input
                            id={`prize-desc-${index}`}
                            value={prize.description}
                            onChange={(e) => handleAdditionalPrizeChange(index, "description", e.target.value)}
                            placeholder="Brief description of the prize"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="duration" className="text-base">
                  How long should the raffle be available online?
                </Label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                  required
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="21">21 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={nextStep} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Data Capture & Images</CardTitle>
              <CardDescription>Upload images and set up your data capture questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="websiteLink" className="text-base">
                  Website Link
                </Label>
                <Input
                  id="websiteLink"
                  name="websiteLink"
                  type="url"
                  value={formData.websiteLink}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Users will be redirected to this link after entering the raffle.
                </p>
              </div>

              <div>
                <Label htmlFor="images" className="text-base">
                  Upload Images
                </Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                    <p className="text-xs text-gray-500 mb-4">Upload your business logo and images of the prizes</p>
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
                      className="text-[#00B8A9] border-[#00B8A9]"
                    >
                      Select Files
                    </Button>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Uploaded Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                          {image}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base">Data Capture Questions</Label>
                  <Button
                    type="button"
                    onClick={addQuestion}
                    variant="outline"
                    size="sm"
                    className="text-[#00B8A9]"
                    disabled={formData.dataQuestions.length >= 5}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.dataQuestions.map((q, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 h-8 px-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`question-${index}`} className="text-sm">
                            Question Text
                          </Label>
                          <Input
                            id={`question-${index}`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                            placeholder="e.g., What month does your home insurance renew?"
                            className="mt-1"
                            required={q.required}
                          />
                        </div>
                        <div className="flex items-center">
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

                <div className="mt-2 flex items-start">
                  <HelpCircle className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <p className="text-xs text-gray-500">
                    You can add up to 5 questions to gather insights from participants. At least one question is
                    required.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={prevStep} variant="outline">
                Previous Step
              </Button>
              <Button type="button" onClick={nextStep} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                Next Step
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your raffle details and agree to the terms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Raffle Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Main Prize</p>
                      <p className="text-sm">{formData.mainPrize}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-sm">{formData.duration} days</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Reason</p>
                      <p className="text-sm">{formData.reason}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Website Link</p>
                      <p className="text-sm">{formData.websiteLink}</p>
                    </div>
                  </div>
                </div>

                {formData.additionalPrizes.length > 0 && formData.additionalPrizes[0].name && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Additional Prizes</h3>
                    <div className="space-y-2">
                      {formData.additionalPrizes.map(
                        (prize, index) =>
                          prize.name && (
                            <div key={index} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                              <p className="text-sm font-medium">{prize.name}</p>
                              {prize.description && <p className="text-sm text-gray-600">{prize.description}</p>}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Data Capture Questions</h3>
                  <div className="space-y-2">
                    {formData.dataQuestions.map(
                      (q, index) =>
                        q.question && (
                          <div key={index} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                            <p className="text-sm font-medium">
                              Question {index + 1}: {q.question}
                            </p>
                            <p className="text-xs text-gray-500">{q.required ? "Required" : "Optional"}</p>
                          </div>
                        ),
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Uploaded Images</h3>
                  {formData.images.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="bg-white px-3 py-1 rounded-full text-xs border border-gray-200">
                          {image}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No images uploaded</p>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-start">
                  <input
                    id="termsAgreed"
                    name="termsAgreed"
                    type="checkbox"
                    checked={formData.termsAgreed}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="termsAgreed" className="ml-2 block text-sm text-gray-700">
                    I have read and understood the{" "}
                    <Link href="/terms" className="text-[#00B8A9] hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="paymentAgreed"
                    name="paymentAgreed"
                    type="checkbox"
                    checked={formData.paymentAgreed}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="paymentAgreed" className="ml-2 block text-sm text-gray-700">
                    I confirm that we will pay a maximum of £0.75 per ticket issued
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Your raffle will be reviewed by our team and will be approved within 24 hours. You'll receive an
                    email notification once it's live.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" onClick={prevStep} variant="outline">
                Previous Step
              </Button>
              <Button
                type="submit"
                className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white"
                disabled={isSubmitting || !formData.termsAgreed || !formData.paymentAgreed}
              >
                {isSubmitting ? "Submitting..." : "Submit Raffle"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  )
}

