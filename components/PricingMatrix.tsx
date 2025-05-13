"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const flexiblePlans = [
  {
    name: "Starter",
    campaigns: 1,
    pricePerTicket: 1.25,
    discount: "0%",
    features: ["Single campaign", "Basic analytics", "Email support"],
  },
  {
    name: "Growth",
    campaigns: 4,
    pricePerTicket: 0.95,
    discount: "24%",
    features: ["4 campaigns", "Advanced analytics", "Priority email support"],
  },
  {
    name: "Scale",
    campaigns: 6,
    pricePerTicket: 0.75,
    discount: "40%",
    features: ["6 campaigns", "Premium analytics", "Phone & email support"],
    popular: true,
  },
  {
    name: "Enterprise",
    campaigns: "Custom",
    pricePerTicket: "Custom",
    discount: "Custom",
    features: ["Unlimited campaigns", "Custom analytics", "Dedicated support team"],
  },
]

const fixedPlans = [
  {
    name: "Basic",
    price: 1200,
    tickets: 100000,
    pricePerTicket: 1.2,
    discount: "4%",
    features: ["2 campaigns", "Basic analytics", "Email support"],
  },
  {
    name: "Professional",
    price: 4500,
    tickets: 500000,
    pricePerTicket: 0.9,
    discount: "28%",
    features: ["5 campaigns", "Advanced analytics", "Priority support"],
  },
  {
    name: "Business",
    price: 7000,
    tickets: 1000000,
    pricePerTicket: 0.7,
    discount: "44%",
    features: ["10 campaigns", "Premium analytics", "Dedicated account manager"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tickets: "Custom",
    pricePerTicket: "Custom",
    discount: "Custom",
    features: ["Unlimited campaigns", "Custom analytics", "Tailored solution"],
  },
]

export default function PricingMatrix() {
  const [isFlexible, setIsFlexible] = useState(true)

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setIsFlexible(true)}
          variant={isFlexible ? "default" : "outline"}
          className="rounded-r-none"
        >
          Flexible
        </Button>
        <Button
          onClick={() => setIsFlexible(false)}
          variant={!isFlexible ? "default" : "outline"}
          className="rounded-l-none"
        >
          Fixed
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {(isFlexible ? flexiblePlans : fixedPlans).map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gray-50 rounded-lg p-6 shadow-md relative ${
              plan.popular ? "border-2 border-[#00B8A9]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#00B8A9] text-white py-1 px-3 rounded-bl-lg rounded-tr-lg flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">{plan.name}</h3>
            {isFlexible ? (
              <>
                <p className="text-4xl font-bold text-[#00B8A9] mb-2">
                  {typeof plan.pricePerTicket === "number" ? `${plan.pricePerTicket}p` : plan.pricePerTicket}
                </p>
                <p className="text-gray-600 mb-4">per raffle ticket</p>
                <p className="font-semibold mb-2">
                  {plan.campaigns} campaign{plan.campaigns !== 1 && "s"}
                </p>
                <p className="text-green-600 font-semibold mb-4">Save {plan.discount}</p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold text-[#00B8A9] mb-2">
                  {typeof plan.price === "number" ? `£${plan.price}` : plan.price}
                </p>
                <p className="text-gray-600 mb-4">per month</p>
                <p className="font-semibold mb-2">
                  Up to {typeof plan.tickets === "number" ? plan.tickets.toLocaleString() : plan.tickets} tickets
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {typeof plan.pricePerTicket === "number" ? `${plan.pricePerTicket}p` : plan.pricePerTicket} per ticket
                </p>
                <p className="text-green-600 font-semibold mb-4">Save {plan.discount}</p>
              </>
            )}
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
              {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

