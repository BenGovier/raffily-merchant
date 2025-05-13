"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "Tandem",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tandem%20%281%29-Rh1gfCFXen9R1xTCLeoow5fBwIMYJx.png",
    width: 120,
  },
  {
    name: "Clear Water Fisheries",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cw%20%281%29-ggy3vJUjtbikmvkmWvxFmMzQPOIZmh.png",
    width: 160,
  },
  {
    name: "EatInOut",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eatinout-2ntpa1xGEEl6GOny6woF74AATCH4sb.png",
    width: 140,
  },
  {
    name: "Wilson House Holiday Park",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whhp-xGJ0FxgP1iXyvyEWwt1T9dR103JHeY.png",
    width: 180,
  },
]

const testimonials = [
  {
    quote: "Raffily has transformed our customer engagement strategy. We've seen a 40% increase in repeat business!",
    author: "Jane Doe",
    company: "EatInOut",
  },
  {
    quote:
      "The insights we've gained through Raffily have been invaluable. Our marketing is now more targeted and effective.",
    author: "John Smith",
    company: "Tandem",
  },
]

export default function Partners() {
  const repeatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners].slice(0, 20)

  return (
    <section className="py-20 bg-white" id="partners">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1E0B36] mb-16">Trusted By Industry Leaders</h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-20">
          {repeatedPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
              className="relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={partner.width}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg"
            >
              <p className="text-lg text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold">
                <p className="text-[#1E0B36]">{testimonial.author}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-accent to-accent/70 text-white text-sm font-medium mb-4">
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
