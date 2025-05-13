"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import BlogCard from "./BlogCard"
import { Loader2 } from "lucide-react"

// Sample blog posts for initial state
const samplePosts = [
  {
    id: 1,
    title: "The Future of Customer Engagement in 2025",
    excerpt:
      "The landscape of customer engagement is rapidly evolving, driven by technological advancements and changing consumer expectations.",
    slug: "future-customer-engagement-2025",
    category: "Strategy",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-11-15",
    author: "Sarah Chen",
    tags: ["Customer Engagement", "AI", "Personalization", "Marketing Trends"],
  },
  {
    id: 2,
    title: "How Raffles Can Boost Your Email Open Rates",
    excerpt:
      "Learn how incorporating raffles into your email marketing strategy can significantly increase open rates and engagement.",
    slug: "raffles-boost-email-open-rates",
    category: "Marketing",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-11-10",
    author: "Michael Wong",
    tags: ["Email Marketing", "Open Rates", "Customer Engagement"],
  },
]

interface BlogPost {
  id: number | string
  title: string
  excerpt: string
  slug?: string
  category: string
  image?: string
  featuredImage?: string
  date: string
  author: string
  tags: string[]
  status?: string
}

const POSTS_PER_PAGE = 12

export default function BlogGrid({
  category = "",
  tag = "",
  searchQuery = "",
}: {
  category: string
  tag: string
  searchQuery: string
}) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [ref, inView] = useInView()

  // Function to fetch blog posts from localStorage
  const fetchBlogPosts = useCallback(async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let allPosts: BlogPost[] = []

    try {
      // Get posts from localStorage
      if (typeof window !== "undefined") {
        const storedPosts = localStorage.getItem("blogPosts")
        if (storedPosts) {
          allPosts = JSON.parse(storedPosts)
        } else {
          // If no posts in localStorage, use sample posts
          allPosts = samplePosts
        }
      } else {
        // Fallback for server-side rendering
        allPosts = samplePosts
      }

      // Filter posts by status (published only)
      allPosts = allPosts.filter((post) => !post.status || post.status === "published")

      // Apply category filter
      if (category) {
        allPosts = allPosts.filter((post) => post.category === category)
      }

      // Apply tag filter
      if (tag) {
        allPosts = allPosts.filter((post) => post.tags && post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
      }

      // Apply search filter
      if (searchQuery) {
        allPosts = allPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Sort by date (newest first)
      allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Paginate
      const startIndex = (page - 1) * POSTS_PER_PAGE
      const endIndex = startIndex + POSTS_PER_PAGE
      const paginatedPosts = allPosts.slice(0, endIndex)

      setPosts(paginatedPosts)
      setHasMore(paginatedPosts.length < allPosts.length)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      setPosts(samplePosts)
      setLoading(false)
      setHasMore(false)
    }
  }, [category, tag, searchQuery, page])

  useEffect(() => {
    setPage(1)
    setPosts([])
    setLoading(true)
    fetchBlogPosts()
  }, [category, tag, searchQuery, fetchBlogPosts])

  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1)
      fetchBlogPosts()
    }
  }, [loading, hasMore, fetchBlogPosts])

  useEffect(() => {
    if (inView && hasMore) {
      loadMorePosts()
    }
  }, [inView, loadMorePosts, hasMore])

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#00B8A9]" />
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <BlogCard
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug || `${post.id}`}
              category={post.category}
              image={post.featuredImage || post.image || "/placeholder.svg?height=400&width=600"}
              date={post.date}
              author={post.author || "Anonymous"}
            />
          </motion.div>
        ))}
      </div>

      {loading && posts.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#00B8A9]" />
        </div>
      )}

      {!loading && hasMore && <div ref={ref} className="h-20" />}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-lg">No blog posts found matching your criteria.</p>
        </div>
      )}

      {!loading && !hasMore && posts.length > 0 && (
        <p className="text-center text-white/70 mt-8">You've reached the end of the blog posts.</p>
      )}
    </>
  )
}
