"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FeaturedPost {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  date: string
}

export default function BlogHero() {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([])
  const [currentPost, setCurrentPost] = useState(0)

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const featured = allPosts.filter((post) => post.isFeatured).slice(0, 3)
    setFeaturedPosts(featured)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPost((prev) => (prev + 1) % featuredPosts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredPosts.length])

  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-2xl h-[600px] shadow-2xl">
      <AnimatePresence mode="wait">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentPost ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/90 to-[#0A1F44]/70 z-10" />
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#00B8A9] to-[#00B8A9]/70 text-white text-sm font-medium mb-4"
                  >
                    {post.category}
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                  >
                    {post.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white/90 mb-6"
                  >
                    {post.excerpt}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-[#0A1F44] font-medium hover:bg-[#00B8A9] hover:text-white transition-colors duration-300"
                    >
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPost(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentPost ? "bg-[#00B8A9]" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
