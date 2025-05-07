"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const sectors = [
  {
    name: "Financial Services",
    description: "Increase client acquisition and loyalty",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finance.jpg-llLmVCZ2GQMz1IrZLur91lUahd7m3Q.jpeg",
    href: "/features/financial-services",
  },
  {
    name: "E-commerce",
    description: "Drive online sales and customer loyalty",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecommerce.jpg-Itsy4IVjfRoLIzWr5bLi5dyMbtB45b.jpeg",
    href: "/sectors/e-commerce",
  },
  {
    name: "Non-Profit",
    description: "Engage donors and boost fundraising",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/non%20profit.jpg-8UA5glhzUewWIAWZpFgVyCeJfDmpWb.jpeg",
    href: "/sectors/non-profit",
  },
  {
    name: "Leisure",
    description: "Improve spa and leisure facility engagement",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2822%29-GljQZb0t0NkwRuoaljOTDQGIVKgkRC.png",
    href: "/features/leisure",
  },
  {
    name: "Hospitality",
    description: "Enhance guest experience and retention",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospitality.jpg-apgIv1P5ny4dcaDbyOvyMrWbcfpvM4.jpeg",
    href: "/features/hospitality",
  },
  {
    name: "Retail",
    description: "Boost in-store traffic and sales",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retail.jpg-dRfpS07EcCORAXC3uUXZtVJzUVZS4C.jpeg",
    href: "/sectors/retail",
  },
  {
    name: "Education",
    description: "Enhance student engagement and fundraising",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/education.jpg-PT8G84jz845wxH4DvoQMfx7BxG8wgh.jpeg",
    href: "/features/education",
  },
]

export default function IndustrySolutions() {
  return (
    <section className="py-20 bg-white" id="sectors">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Solutions for Every Sector</h2>
        <p className="text-xl text-center text-gray-500 mb-12 max-w-3xl mx-auto">
          Discover how Raffily can transform customer engagement across your sector
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <Link href={sector.href} className="block">
                <div className="relative h-64">
                  <Image
                    src={sector.image || "/placeholder.svg"}
                    alt={`${sector.name} solution`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{sector.name}</h3>
                  <p className="text-white/80 mb-4">{sector.description}</p>
                  <span className="inline-flex items-center text-white hover:text-accent transition-colors">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
