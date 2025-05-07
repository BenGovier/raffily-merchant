"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import BlogAuthor from "@/components/blog/BlogAuthor"
import BlogRelated from "@/components/blog/BlogRelated"
import BlogComments from "@/components/blog/BlogComments"
import { Calendar, Clock, Tag, Share2, Loader2 } from "lucide-react"

// Sample blog post for initial state
const samplePost = {
  id: 1,
  title: "The Future of Customer Engagement in 2025",
  content: `
    <p class="lead">The landscape of customer engagement is rapidly evolving, driven by technological advancements and changing consumer expectations. As we look ahead to 2025, several key trends are emerging that will shape how businesses interact with their customers.</p>
    
    <h2>The Rise of Hyper-Personalization</h2>
    <p>Gone are the days of generic marketing messages. Today's consumers expect brands to understand their individual preferences, behaviors, and needs. By 2025, hyper-personalization will be the norm, not the exception.</p>
    <p>AI-powered analytics will enable businesses to create highly tailored experiences for each customer, from personalized product recommendations to customized communication strategies. This level of personalization will extend beyond digital interactions to in-store experiences, creating a seamless omnichannel journey.</p>
    
    <h2>Interactive Experiences Drive Engagement</h2>
    <p>Static content is giving way to interactive experiences that actively involve customers. Gamification elements, such as raffles, contests, and challenges, are proving to be powerful tools for boosting engagement and building brand loyalty.</p>
    <p>These interactive experiences not only capture attention but also provide valuable data insights. By analyzing participation patterns and preferences, businesses can refine their strategies and create even more compelling experiences.</p>
    
    <h2>The Value Exchange Economy</h2>
    <p>Consumers are increasingly aware of the value of their data and attention. In 2025, successful customer engagement will be built on a clear value exchange – customers willingly sharing information in return for tangible benefits.</p>
    <p>Raffles and promotional campaigns that offer genuine value, whether through prizes, exclusive access, or personalized experiences, will thrive in this environment. Transparency about how customer data is used will be essential for building trust and encouraging participation.</p>
    
    <h2>Conclusion</h2>
    <p>As we move toward 2025, customer engagement will be characterized by deeper personalization, more interactive experiences, and a transparent value exchange. Businesses that embrace these trends and leverage tools like Raffily's platform will be well-positioned to build stronger customer relationships and drive growth.</p>
  `,
  slug: "future-customer-engagement-2025",
  category: "Strategy",
  image: "/placeholder.svg?height=800&width=1200",
  date: "2023-11-15",
  readTime: "5 min read",
  author: {
    name: "Sarah Chen",
    role: "Chief Marketing Strategist",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Sarah has over 15 years of experience in digital marketing and customer engagement strategies.",
  },
  tags: ["Customer Engagement", "AI", "Personalization", "Marketing Trends"],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (typeof window !== "undefined") {
          const storedPosts = localStorage.getItem("blogPosts")
          if (storedPosts) {
            const allPosts = JSON.parse(storedPosts)
            // Find post by slug or id
            const foundPost = allPosts.find((p: any) => p.slug === params.slug || p.id.toString() === params.slug)

            if (foundPost) {
              // Format the post for display
              setPost({
                ...foundPost,
                image: foundPost.featuredImage || foundPost.image || "/placeholder.svg?height=800&width=1200",
                readTime: foundPost.readTime || "5 min read",
                author:
                  typeof foundPost.author === "object"
                    ? foundPost.author
                    : {
                        name: foundPost.author || "Anonymous",
                        role: "Contributor",
                        image: "/placeholder.svg?height=100&width=100",
                        bio: "A contributor to the Raffily blog.",
                      },
                tags: foundPost.tags || [],
              })
            } else {
              // If post not found, redirect to blog
              router.push("/blog")
            }
          } else {
            // If no posts in localStorage, use sample post
            setPost(samplePost)
          }
        } else {
          // Fallback for server-side rendering
          setPost(samplePost)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setPost(samplePost)
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug, router])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
        <MainNav />
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
        <MainNav />
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/blog"
              className="px-6 py-3 bg-[#00B8A9] text-white rounded-lg hover:bg-[#00B8A9]/90 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
      <MainNav />
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors duration-300"
          >
            ← Back to all articles
          </Link>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#fd8e8e] to-[#ff7855] text-white text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center text-white/70 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-white/70" />
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/70">Share:</span>
                  <button
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
                    aria-label="Share on Twitter"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <BlogAuthor author={post.author} />

          <BlogRelated currentPostId={post.id} />

          <BlogComments postSlug={post.slug || post.id} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
