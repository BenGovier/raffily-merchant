"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "The perfect addition to your marketing strategy",
    company: "E-commerce Business",
    stars: 5,
  },
  {
    quote: "Transformed our customer engagement",
    company: "Retail Chain",
    stars: 5,
  },
  {
    quote: "Incredible insights and results",
    company: "Service Provider",
    stars: 5,
  },
  {
    quote: "Best decision for our business",
    company: "Online Platform",
    stars: 5,
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-[#1E0B36]" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Hear from our partner businesses</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#2A1147] p-8 rounded-xl"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF4D8D] fill-[#FF4D8D]" />
                ))}
              </div>
              <p className="text-white text-xl mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-white/60">{testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
