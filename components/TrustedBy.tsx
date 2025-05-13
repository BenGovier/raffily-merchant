"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const logos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8bcc13d57021720650_Marquee_logo-4-xIoZ5ykxCBzqmDmQIa9f8Raav4iSKK.svg",
    alt: "Marquee Logo 4",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8a0a55f817949c0e62_Marquee_logo-7-TZXkJUg8TjECx4eRkBhTmLZpS6BIHq.svg",
    alt: "Marquee Logo 7",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8bee26ce1ec9d9e41f_Marquee_logo-2-gYcImXxvOQ0LiQ9vwxAdvWA0oLE9dO.svg",
    alt: "Marquee Logo 2",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/67219553096649af8cd42082_Marquee%20Logo%20Demandbase-ZU2lGIGUvu5E9SxUzno45ek8cWY2th.svg",
    alt: "Demandbase Logo",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8ae57cb1493b3b74b5_Marquee_logo-5-P6iwf7eYHNP6Rg3LIsPy3rp0vIrCCC.svg",
    alt: "Marquee Logo 5",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8a027548698e0cee3c_Marquee_logo-8-7CLQP6RakCi3xi8bWHrvDVnVUY84rN.svg",
    alt: "Marquee Logo 8",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8abd13ec4c3c9394c9_Marquee_logo-6-h2doIWPdXlmbLs9Opsi44IPxBmLGGM.svg",
    alt: "Marquee Logo 6",
    width: 200,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/671f6d8a4efc100afb413872_Marquee_logo-10-mLfwQ41BIRDzMEoXoAjH5cctnOTx5m.svg",
    alt: "Marquee Logo 10",
    width: 200,
  },
]

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-primary font-poppins">
          World-class marketing teams trust Raffily
        </h2>

        <div className="relative">
          <div className="flex space-x-16 overflow-hidden">
            <motion.div
              className="flex space-x-16 items-center"
              animate={{
                x: [0, -2880],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={logo.width * 1.5}
                    height={100}
                    className="h-20 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

