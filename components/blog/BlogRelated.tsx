"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface RelatedPost {
  id: number | string
  title: string
  excerpt: string
  slug?: string
  category: string
  image?: string
  featuredImage?: string
}

export default function BlogRelated({ currentPostId }: { currentPostId: number | string }) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedPosts = localStorage.getItem("blogPosts")
          if (storedPosts) {
            const allPosts = JSON.parse(storedPosts)

            // Filter out current post and get only published posts
            const otherPosts = allPosts.filter(
              (post: any) => post.id !== currentPostId && (!post.status || post.status === "published"),
            )

            // Get up to 3 random posts
            const randomPosts = otherPosts.sort(() => 0.5 - Math.random()).slice(0, 3)

            setRelatedPosts(randomPosts)
          }
        }
      } catch (error) {
        console.error("Error fetching related posts:", error)
        setRelatedPosts([])
      }
    }

    fetchRelatedPosts()
  }, [currentPostId])

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group">
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.featuredImage || post.image || "/placeholder.svg?height=300&width=500"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 text-xs bg-[#00B8A9] text-white rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-[#00B8A9] transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/70 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
