"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  slug: string
  category: string
  image: string
  date: string
  author: string
}

export default function BlogCard({ title, excerpt, slug, category, image, date, author }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/70 text-white text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-[#00B8A9] transition-colors duration-300">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-white/70 mb-4 line-clamp-3 flex-grow">{excerpt}</p>
        <div className="flex justify-between items-center text-white/60 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
