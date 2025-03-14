"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Resource {
  name: string
  format: string
  size: string
  filename: string
}

interface ResourceSectionProps {
  id: string
  title: string
  description: string
  resources: Resource[]
}

export default function ResourceSection({ id, title, description, resources }: ResourceSectionProps) {
  return (
    <section id={id} className="py-16 bg-white/10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-xl text-white/80 mb-8">{description}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{resource.name}</h3>
              <p className="text-white/80 mb-4">
                Format: {resource.format} | Size: {resource.size}
              </p>
              <Button className="w-full bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
                <a href={`/downloads/${resource.filename}`} download>
                  <Download className="w-4 h-4 mr-2" /> Download
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

