"use client"
import { Check, Star } from "lucide-react"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: "£149",
    entries: "Up to 1,000",
    costPerTicket: "£0.15",
    popular: false,
    features: ["Branded prize page", "Email support", "Basic analytics", "Winner selection", "Email notifications"],
  },
  {
    name: "Growth",
    price: "£349",
    entries: "1,001 – 5,000",
    costPerTicket: "£0.07–£0.34",
    popular: false,
    features: [
      "Branded prize page",
      "Priority email support",
      "Advanced analytics",
      "Winner selection",
      "Email notifications",
      "Custom branding",
      "API access",
    ],
  },
  {
    name: "Scale",
    price: "£599",
    entries: "5,001 – 10,000",
    costPerTicket: "£0.06–£0.11",
    popular: true,
    features: [
      "Branded prize page",
      "Priority email & phone support",
      "Advanced analytics",
      "Winner selection",
      "Email notifications",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
  {
    name: "Pro",
    price: "£999",
    entries: "10,001 – 25,000",
    costPerTicket: "£0.04–£0.10",
    popular: false,
    features: [
      "Branded prize page",
      "Priority email & phone support",
      "Advanced analytics",
      "Winner selection",
      "Email notifications",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solution",
      "Multi-user access",
    ],
  },
]

export default function MonthlyPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {plans.map((plan) => (
        <motion.div
          key={plan.name}
          className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
            plan.popular ? "border-2 border-[#B878F1]" : "border border-gray-200"
          }`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#F471B5] to-[#B878F1] text-white px-4 py-1 rounded-bl-lg text-sm font-medium flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </div>
          )}

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
              <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Entries/Month</span>
                <span className="font-medium text-gray-900">{plan.entries}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Cost per Ticket</span>
                <span className="font-medium text-gray-900">{plan.costPerTicket}</span>
              </div>

              <div className="flex items-center text-green-600">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Includes £5,000 Monthly Mega Prize</span>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? "bg-gradient-to-r from-[#F471B5] to-[#B878F1] text-white hover:opacity-90"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Get Started
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
