"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BlogCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    // Get categories from localStorage
    const storedCategories = localStorage.getItem("blogCategories")
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      // Default categories if none exist
      const defaultCategories = ["Strategy", "Data Insights", "Compliance", "Marketing", "Case Studies"]
      setCategories(defaultCategories)
      localStorage.setItem("blogCategories", JSON.stringify(defaultCategories))
    }
  }, [])

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
      <div className="space-y-2">
        <Link
          href="/blog"
          className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
            pathname === "/blog" ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
          }`}
        >
          All Categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${category}`}
            className={`block px-3 py-2 rounded-lg transition-colors duration-200 ${
              pathname.includes(`category=${category}`) ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}

