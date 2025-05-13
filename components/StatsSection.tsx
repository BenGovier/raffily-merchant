"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const stats = [
  {
    title: "Customer Engagement",
    value: "250%",
    description: "Average increase in customer interaction rates",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/results-x7o0qYqrBCAyl4EEnJctSRtgzpB4g6.png",
  },
  {
    title: "Data Collection",
    value: "10x",
    description: "More customer insights gathered compared to traditional methods",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/insiuhgts-OfpBN0q3ILQO2CrlzuGVHV69iCIL0C.png",
  },
  {
    title: "User Experience",
    value: "98%",
    description: "Customer satisfaction rate with Raffily platform",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user%20xp-QugvvsIzAJKQyMK6PXJPO8Wo9sCEw4.png",
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1E0B36] mb-16">
          Why Global Businesses Choose Raffily
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-gray-50 rounded-xl p-8 text-center"
            >
              <div className="relative w-16 h-16 mx-auto mb-6">
                <Image src={stat.image || "/placeholder.svg"} alt={stat.title} fill className="object-contain" />
              </div>
              <h3 className="text-5xl font-bold text-[#FF4D8D] mb-4">{stat.value}</h3>
              <h4 className="text-xl font-semibold text-[#1E0B36] mb-2">{stat.title}</h4>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
