"use client"

import { motion } from "framer-motion"

export default function PricingCTA() {
  return (
    <motion.div
      className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-gradient-to-r from-[#F471B5] to-[#B878F1] p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost engagement with Raffily?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of businesses using Raffily to increase customer engagement, grow their email lists, and drive
          sales with exciting raffles.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#B878F1] py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="bg-transparent border border-white text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Schedule a Demo
          </button>
        </div>
      </div>
    </motion.div>
  )
}
