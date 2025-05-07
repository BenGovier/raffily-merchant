"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Users,
    title: "Engage",
    description: "Create exciting raffle campaigns that drive participation and brand loyalty",
  },
  {
    icon: TrendingUp,
    title: "Retain",
    description: "Turn one-time participants into long-term brand advocates",
  },
  {
    icon: Target,
    title: "Grow",
    description: "Leverage insights to expand your customer base and increase revenue",
  },
]

export default function EngageRetainGrow() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1E0B36] mb-12">Engage, Retain & Grow</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center flex flex-col h-full"
            >
              <div className="mb-4">
                <feature.icon className="w-12 h-12 mx-auto text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E0B36] mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
              <div className="mt-auto">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
