"use client"

import { motion } from "framer-motion"
import { Shield, Users, Trophy, Target } from "lucide-react"

const standards = [
  {
    icon: Shield,
    title: "Outstanding Features",
    description: "Comprehensive tools for successful campaigns",
  },
  {
    icon: Users,
    title: "Secure Transactions & Compliance",
    description: "Full regulatory compliance and data security",
  },
  {
    icon: Trophy,
    title: "Engaging Customer Trust",
    description: "Build lasting relationships with your audience",
  },
  {
    icon: Target,
    title: "Optimizing Raffle Success",
    description: "Maximize participation and engagement",
  },
]

export default function RaffilyStandard() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#1E0B36] text-center mb-16">The Raffily Standard</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standards.map((standard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FF4D8D]/10 flex items-center justify-center">
                <standard.icon className="w-8 h-8 text-[#FF4D8D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E0B36] mb-2">{standard.title}</h3>
              <p className="text-gray-600">{standard.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

