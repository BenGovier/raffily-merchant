"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function BusinessTypeSelector() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const businessTypes = [
    { id: "retail", name: "Retail & E-Commerce", href: "/sectors/retail" },
    { id: "financial", name: "Financial Services", href: "/sectors/financial-services" },
    { id: "hospitality", name: "Hospitality & Events", href: "/sectors/hospitality" },
    { id: "subscription", name: "Subscription Services", href: "/sectors/subscription" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E0B36] mb-4">
            Find the Perfect Raffle Solution for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select your industry to see how Raffily can help you engage customers, collect valuable data, and drive
            growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedType === type.id
                    ? "border-[#00B8A9] bg-[#00B8A9]/5 text-[#00B8A9]"
                    : "border-gray-200 hover:border-[#00B8A9]/50 hover:bg-[#00B8A9]/5"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {selectedType ? (
              <Link
                href={businessTypes.find((type) => type.id === selectedType)?.href || "/sectors"}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors gap-2"
              >
                See {businessTypes.find((type) => type.id === selectedType)?.name} Solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/sectors"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#00B8A9] rounded-full text-base font-medium text-[#00B8A9] bg-white hover:bg-[#00B8A9]/5 transition-colors"
              >
                View All Industry Solutions
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
