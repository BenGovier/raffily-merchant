"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function PricingToggle() {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setIsMonthly(true)}
          className={`relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            isMonthly ? "text-white" : "text-gray-700"
          }`}
        >
          {isMonthly && (
            <motion.div
              layoutId="pricing-toggle-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#F471B5] to-[#B878F1] rounded-md"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Monthly Plans</span>
        </button>

        <button
          onClick={() => setIsMonthly(false)}
          className={`relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            !isMonthly ? "text-white" : "text-gray-700"
          }`}
        >
          {!isMonthly && (
            <motion.div
              layoutId="pricing-toggle-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#F471B5] to-[#B878F1] rounded-md"
              initial={false}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Pay-As-You-Go</span>
        </button>
      </div>

      <div className="mt-16 w-full">
        {isMonthly ? (
          <div id="monthly-plans-content">{/* Monthly plans content will be rendered by MonthlyPlans component */}</div>
        ) : (
          <div id="pay-as-you-go-content">{/* Pay-as-you-go content will be rendered by PayAsYouGo component */}</div>
        )}
      </div>
    </div>
  )
}
