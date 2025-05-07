"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Star } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function PricingPage() {
  const [pricingType, setPricingType] = useState<"monthly" | "payg">("monthly")

  const monthlyPlans = [
    {
      name: "Starter",
      price: 149,
      entries: "Up to 1,000",
      costPerTicket: "£0.15",
      features: ["Branded prize page", "Email support", "Basic analytics", "1 admin user", "Standard email templates"],
      popular: false,
    },
    {
      name: "Growth",
      price: 349,
      entries: "1,001 - 5,000",
      costPerTicket: "£0.07-£0.34",
      features: [
        "Branded prize page",
        "Priority email support",
        "Advanced analytics",
        "3 admin users",
        "Custom email templates",
        "Social sharing tools",
      ],
      popular: false,
    },
    {
      name: "Scale",
      price: 599,
      entries: "5,001 - 10,000",
      costPerTicket: "£0.06-£0.11",
      features: [
        "Branded prize page",
        "Priority email & chat support",
        "Premium analytics",
        "5 admin users",
        "Custom email templates",
        "Social sharing tools",
        "API access",
        "Dedicated account manager",
      ],
      popular: true,
    },
    {
      name: "Pro",
      price: 999,
      entries: "10,001 - 25,000",
      costPerTicket: "£0.04-£0.10",
      features: [
        "Branded prize page",
        "Priority email & chat support",
        "Premium analytics",
        "10 admin users",
        "Custom email templates",
        "Social sharing tools",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#F471B5] to-[#B878F1] py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple Pricing That Scales With You</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose a plan that works for your business needs, with flexible options that grow as you do.
            </p>
          </div>
        </section>

        {/* Pricing Toggle */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-full flex items-center">
                <button
                  onClick={() => setPricingType("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    pricingType === "monthly" ? "bg-white shadow-md text-[#F471B5]" : "text-gray-600"
                  }`}
                >
                  Monthly Plans
                </button>
                <button
                  onClick={() => setPricingType("payg")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    pricingType === "payg" ? "bg-white shadow-md text-[#F471B5]" : "text-gray-600"
                  }`}
                >
                  Pay-As-You-Go
                </button>
              </div>
            </div>

            {/* Monthly Plans */}
            {pricingType === "monthly" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {monthlyPlans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] ${
                      plan.popular ? "border-2 border-[#00B8A9] relative" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-[#00B8A9] text-white py-1 px-3 rounded-bl-lg rounded-tr-lg flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">£{plan.price}</span>
                        <span className="text-gray-500 ml-1">/month</span>
                      </div>
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{plan.entries}</span> entries/month
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{plan.costPerTicket}</span> per ticket
                        </p>
                      </div>
                      <div className="mb-6">
                        <div className="flex items-center mb-3 text-green-600">
                          <Check className="w-5 h-5 mr-2" />
                          <p className="text-sm font-medium">Includes entry to £5,000 Monthly Mega Prize</p>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <button className="w-full py-3 px-4 bg-gradient-to-r from-[#F471B5] to-[#B878F1] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Get Started
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pay-As-You-Go */}
            {pricingType === "payg" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay-As-You-Go</h3>
                      <p className="text-gray-600">Perfect for seasonal or one-off promotions</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="text-4xl font-bold text-gray-900">£0.75</span>
                      <span className="text-gray-500 ml-1">per ticket</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Full access to dashboard</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Complete analytics suite</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Email support</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Branded prize page</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-4 h-4 text-[#00B8A9] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Standard email templates</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <X className="w-5 h-5 text-red-500 mr-2" />
                        What's Not Included
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">No access to £5,000 Monthly Mega Prize</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Merchants provide their own prize</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">No dedicated account manager</span>
                        </li>
                        <li className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Limited API access</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="py-3 px-8 bg-gradient-to-r from-[#F471B5] to-[#B878F1] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Use Pay-As-You-Go
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What is the Monthly Mega Prize?</h3>
                <p className="text-gray-700">
                  The Monthly Mega Prize is a £5,000 prize pool that all participants from monthly plan raffles are
                  automatically entered into. This creates an additional incentive for customers to participate in your
                  raffles.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Can I switch between plans?</h3>
                <p className="text-gray-700">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your
                  next billing cycle.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What happens if I exceed my monthly entries?</h3>
                <p className="text-gray-700">
                  If you exceed your monthly entry allocation, additional entries will be charged at your plan's
                  per-ticket rate. You can also upgrade to a higher tier at any time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Is there a contract or commitment?</h3>
                <p className="text-gray-700">
                  No, all plans are month-to-month with no long-term commitment. You can cancel at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#F471B5] to-[#B878F1]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to boost engagement with Raffily?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of businesses using Raffily to increase customer engagement and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-white text-[#F471B5] font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Book a Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
