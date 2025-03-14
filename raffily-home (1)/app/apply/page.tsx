"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

const steps = [
  {
    id: "welcome",
    title: "Welcome to Raffily",
    subtitle: "Let's get started with your free trial",
  },
  {
    id: "name",
    title: "What's your name?",
    subtitle: "We'd love to know who we're talking to",
  },
  {
    id: "business",
    title: "Tell us about your business",
    subtitle: "This helps us tailor your experience",
  },
  {
    id: "contact",
    title: "How can we reach you?",
    subtitle: "We'll send your login details here",
  },
  {
    id: "goals",
    title: "What are your main goals?",
    subtitle: "Select all that apply",
  },
  {
    id: "complete",
    title: "You're all set!",
    subtitle: "Let's get you started with Raffily",
  },
]

const goals = [
  "Increase email open rates",
  "Boost customer engagement",
  "Collect valuable customer data",
  "Improve customer retention",
  "Run compliant promotional campaigns",
  "Integrate with existing systems",
]

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    industry: "",
    email: "",
    phone: "",
    goals: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleGoal = (goal: string) => {
    const newGoals = formData.goals.includes(goal)
      ? formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal]
    setFormData({ ...formData, goals: newGoals })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Use window.location for a hard redirect
    window.location.href = "/apply/thank-you"
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return (
          <div className="text-center">
            <p className="text-xl mb-6 text-gray-200">Ready to transform your customer engagement?</p>
            <Button onClick={handleNext} className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-6 py-3">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )
      case "name":
        return (
          <Input
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="max-w-md mx-auto text-gray-800"
          />
        )
      case "business":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <Input
              placeholder="Business name"
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="text-gray-800"
            />
            <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
              <SelectTrigger className="text-gray-800 bg-white">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="finance">Financial Services</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "contact":
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Business email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="text-gray-800"
            />
            <Input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="text-gray-800"
            />
          </div>
        )
      case "goals":
        return (
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {goals.map((goal) => (
              <Button
                key={goal}
                onClick={() => toggleGoal(goal)}
                variant={formData.goals.includes(goal) ? "default" : "outline"}
                className={`justify-start ${formData.goals.includes(goal) ? "bg-[#00B8A9] text-white" : "bg-white text-gray-800"}`}
              >
                {goal}
              </Button>
            ))}
          </div>
        )
      case "complete":
        return (
          <div className="text-center">
            <p className="text-xl mb-6 text-gray-200">Great! We're excited to have you on board.</p>
            <Button
              onClick={handleSubmit}
              className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-6 py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  Submit Application <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-[#1E3A8A]/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
                <p className="text-xl text-gray-200 mb-8">{steps[currentStep].subtitle}</p>
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {currentStep > 0 && currentStep < steps.length - 1 && (
              <div className="mt-8 flex justify-between">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="text-[#00B8A9] border-[#00B8A9] hover:bg-[#00B8A9] hover:text-white text-lg px-6 py-3 transition-colors duration-300"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-6 py-3"
                >
                  Next <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

