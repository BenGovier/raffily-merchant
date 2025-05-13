"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "Is Raffily legal/compliant in my region?",
    answer:
      "Raffily is designed to be compliant with promotional regulations in most regions. We handle the legal requirements, but it's always a good idea to check your local laws.",
  },
  {
    question: "What if I don't have a prize?",
    answer:
      "While having a prize can increase engagement, Raffily can also be used for lead generation or data collection without a prize. We can help you design engaging campaigns either way.",
  },
  {
    question: "How do I withdraw revenue from paid raffles?",
    answer:
      "Revenue from paid raffles can be withdrawn directly to your linked bank account. The process is secure and typically takes 3-5 business days.",
  },
  {
    question: "Can I customize the raffle appearance?",
    answer:
      "Yes! Raffily offers extensive customization options. You can brand your raffles with your logo, colors, and even custom CSS if you're tech-savvy.",
  },
  {
    question: "How long does a typical raffle last?",
    answer:
      "Raffle duration is flexible and up to you. Most successful raffles run for 1-4 weeks, but you can set shorter or longer periods based on your goals and audience.",
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1E0B36] mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-gray-100 rounded-lg focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold text-[#1E0B36]">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#FF4D8D]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#FF4D8D]" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-xl mb-4">Still have questions?</p>
          <Button className="bg-accent hover:bg-accent/90 text-white">Contact Us</Button>
        </div>
      </div>
    </section>
  )
}

