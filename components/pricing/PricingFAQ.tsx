"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "What is the £5,000 Monthly Mega Prize?",
    answer:
      "The Monthly Mega Prize is a £5,000 prize pool that all participants from monthly plan raffles are automatically entered into. This creates an additional incentive for customers to participate in your raffles, increasing engagement and conversion rates.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle. If you need more entries mid-month, you can purchase additional entries at your current plan rate.",
  },
  {
    question: "What happens if I exceed my monthly entry limit?",
    answer:
      "If you exceed your monthly entry limit, additional entries will be charged at your plan's per-ticket rate. You'll receive notifications when you reach 80% and 95% of your limit so you can decide whether to upgrade or purchase additional entries.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "Monthly plans are billed monthly with no long-term commitment. You can cancel at any time. For Pay-As-You-Go, there is no monthly fee or commitment - you only pay for the tickets you use.",
  },
  {
    question: "How do I get started?",
    answer:
      'Simply select the plan that best fits your needs and click "Get Started". You\'ll be guided through the setup process, which typically takes less than 10 minutes. Our team is available to help if you have any questions.',
  },
]

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
