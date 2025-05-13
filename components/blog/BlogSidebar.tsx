"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tag } from "lucide-react"

export default function BlogSidebar() {
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    // Load categories and tags from localStorage
    if (typeof window !== "undefined") {
      // Load categories
      const storedCategories = localStorage.getItem("blogCategories")
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories))
      } else {
        // Default categories
        const defaultCategories = ["Strategy", "Data Insights", "Compliance", "Marketing", "Case Studies"]
        setCategories(defaultCategories)
      }

      // Extract tags from blog posts
      const storedPosts = localStorage.getItem("blogPosts")
      if (storedPosts) {
        const posts = JSON.parse(storedPosts)
        // Get all tags from all posts
        const allTags = posts.flatMap((post: any) => post.tags || [])
        // Remove duplicates and limit to 10
        const uniqueTags = [...new Set(allTags)].slice(0, 10)
        setTags(uniqueTags)
      } else {
        // Default tags
        setTags([
          "Customer Engagement",
          "Raffles",
          "Data Analysis",
          "AI",
          "Personalization",
          "Loyalty Programs",
          "Gamification",
          "ROI",
          "Brand Awareness",
          "Customer Retention",
        ])
      }
    }
  }, [])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/blog"
              className="flex justify-between items-center py-2 px-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
            >
              <span>All Categories</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/blog?category=${category}`}
                className="flex justify-between items-center py-2 px-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
              >
                <span>{category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm hover:bg-[#00B8A9] transition-colors duration-300"
            >
              <Tag className="w-4 h-4 mr-1" />
              {tag}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

