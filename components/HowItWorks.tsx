"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PenTool, ShieldCheck, Megaphone, Gift, BarChart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: PenTool,
    title: "Launch a Raffle in Minutes",
    description:
      "Easily create a fully branded raffle in minutes—no coding required. Just pick your prize, add your questions, and you're ready to go.",
  },
  {
    icon: ShieldCheck,
    title: "100% Legal, 0% Hassle",
    description:
      "We handle all legal compliance automatically, so you can focus on engagement. Our platform ensures your raffles meet all regulatory requirements.",
  },
  {
    icon: Megaphone,
    title: "Reach More Customers with Automated Promotion",
    description:
      "Promote your raffle across email, social media, and pop-ups to maximize reach and conversions. Watch your engagement metrics soar.",
  },
  {
    icon: Gift,
    title: "Excite Customers with Instant Winner Selection",
    description:
      "Let Raffily pick winners fairly and instantly—boosting excitement and brand trust. Automated notifications keep everyone informed.",
  },
  {
    icon: BarChart,
    title: "Use Data to Drive More Sales",
    description:
      "Use customer insights to send re-engagement emails and drive repeat business. Turn raffle participants into loyal, repeat customers.",
  },
]

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 2000) // Change step every 2 seconds (60% faster)

    return () => clearInterval(timer)
  }, [])

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length)
  }

  const goToNextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
  }

  return (
    <section className="py-16 bg-[#0A1F44]" id="how-it-works">
      <div className="w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          How Raffily Works: Create, Launch & Grow in Minutes
        </h2>
        <p className="text-xl text-center text-white/80 mb-10 max-w-3xl mx-auto">
          Setting up a raffle is simple—just follow these steps to boost engagement and grow your brand.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`bg-white/10 backdrop-blur-md rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-white/20 h-full flex flex-col ${
                    currentStep === index ? "border-2 border-[#00B8A9]" : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/70 w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/70 text-xs mt-auto">{step.description.substring(0, 40)}...</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6"
            >
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/70 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-white" })}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Step {currentStep + 1}: {steps[currentStep].title}
                  </h4>
                  <p className="text-white/80 text-base">{steps[currentStep].description}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white mt-4"
                  onClick={() => (window.location.href = "/apply")}
                >
                  Start Your First Raffle Today
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-4 space-x-4">
            <Button
              onClick={goToPreviousStep}
              variant="outline"
              size="icon"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={goToNextStep}
              variant="outline"
              size="icon"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
