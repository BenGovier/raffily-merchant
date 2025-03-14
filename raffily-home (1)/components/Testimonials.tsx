"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Raffily transformed our customer engagement strategy. We've seen a 40% increase in repeat business!",
    author: "Jane Doe",
    role: "Marketing Director",
    company: "Global Retail Solutions",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TESTIMONAL%20JOHN%20%281%29-vQQBfGxjJ7GSoEyDvMJqPFTlTTtR2C.png",
    stars: 5,
  },
  {
    quote:
      "The insights we've gained through Raffily have been invaluable. Our marketing is now more targeted and effective.",
    author: "John Smith",
    role: "CEO",
    company: "TechStart Solutions",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TESTIMONAL%20JOHN-zHCkorM8bAQGKBlk6j9mUlzCtSR8uF.png",
    stars: 5,
  },
  {
    quote: "We've seen a 40% increase in customer data collection since implementing Raffily's solution.",
    author: "Michael Thompson",
    role: "Head of Digital",
    company: "Innovation Retail",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TESTIMONAL%20MIKE-zfOGmQWWIhB13mvSa61oYtWoxA9bT3.png",
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0A1F44]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Trusted by Industry Leaders</h2>
        <p className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
          See how businesses are transforming their customer engagement with Raffily
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#00B8A9] fill-[#00B8A9]" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold">
                <p className="text-[#0A1F44]">{testimonial.author}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/70 text-white text-sm font-medium mb-4">
                  {testimonial.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

