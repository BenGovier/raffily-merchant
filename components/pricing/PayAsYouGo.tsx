"use client"

import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

export default function PayAsYouGo() {
  return (
    <motion.div
      className="max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900">Pay-As-You-Go</h2>
        <p className="mt-2 text-lg text-gray-600">Perfect for seasonal or one-off promotions</p>

        <div className="mt-8 flex items-baseline">
          <span className="text-5xl font-extrabold text-gray-900">£0.75</span>
          <span className="ml-2 text-xl font-medium text-gray-500">per raffle ticket</span>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              What's Included
            </h3>
            <ul className="space-y-3">
              {[
                "Full access to dashboard",
                "Analytics and reporting",
                "Winner selection tools",
                "Email notifications",
                "API access",
                "Custom branding",
                "No monthly commitment",
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <X className="w-5 h-5 text-red-500 mr-2" />
              What's Not Included
            </h3>
            <ul className="space-y-3">
              {[
                "No access to £5,000 Monthly Mega Prize",
                "No dedicated account manager",
                "Limited phone support",
                "No volume discounts",
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-gray-600 mb-6">
            With Pay-As-You-Go, you provide your own prize and only pay for the tickets you use. Best for businesses
            with seasonal promotions or those testing the waters.
          </p>

          <button className="py-3 px-6 rounded-lg font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            Use Pay-As-You-Go
          </button>
        </div>
      </div>
    </motion.div>
  )
}
