"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Loader2 } from "lucide-react"

export default function EditBlogPost() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [tags, setTags] = useState("")
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Loading content...</p>",
  })

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (!adminLoggedIn) {
      router.push("/admin/login")
      return
    }

    // Load categories from localStorage
    const storedCategories = localStorage.getItem("blogCategories")
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      setCategories(["Strategy", "Data Insights", "Compliance", "Marketing", "Case Studies"])
    }

    // Load post data
    const posts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const post = posts.find((p: any) => p.id.toString() === postId)

    if (post) {
      setTitle(post.title || "")
      setExcerpt(post.excerpt || "")
      setCategory(post.category || "")
      setTags((post.tags || []).join(", "))
      setFeaturedImage(post.featuredImage || null)
      setIsFeatured(post.featured || false)

      if (editor) {
        editor.commands.setContent(post.content || "<p>Start writing your blog post here...</p>")
      }
    } else {
      alert("Post not found")
      router.push("/admin/blogs")
    }

    setIsLoading(false)
  }, [router, postId, editor])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setCategory("")
    } else {
      setCategory(value)
      setCustomCategory("")
    }
  }

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value)
    setCategory("custom")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const finalCategory = category === "custom" ? customCategory : category

      // Generate a slug from the title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      // Get existing posts
      const posts = JSON.parse(localStorage.getItem("blogPosts") || "[]")

      // Find and update the post
      const updatedPosts = posts.map((post: any) => {
        if (post.id.toString() === postId) {
          return {
            ...post,
            title,
            excerpt,
            content: editor?.getHTML() || "",
            category: finalCategory,
            tags: tags.split(",").map((tag) => tag.trim()),
            featuredImage,
            featured: isFeatured,
            slug: slug,
            readTime: `${Math.max(1, Math.ceil((editor?.getHTML().length || 0) / 2000))} min read`,
          }
        }
        return post
      })

      // Save updated posts
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

      // Update categories if a new one was added
      if (finalCategory && !categories.includes(finalCategory)) {
        const updatedCategories = [...categories, finalCategory]
        setCategories(updatedCategories)
        localStorage.setItem("blogCategories", JSON.stringify(updatedCategories))
      }

      // Redirect to blog management page
      router.push("/admin/blogs")
    } catch (error) {
      console.error("Error updating blog post:", error)
      alert("There was an error updating your blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A] text-white p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00B8A9]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A] text-white p-8">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white/5 text-white"
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              className="w-full bg-white/5 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <EditorContent editor={editor} className="prose prose-invert max-w-none bg-white/5 rounded-md p-4" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <Select onValueChange={handleCategoryChange} value={category}>
              <SelectTrigger className="w-full bg-white/5 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Add Custom Category</SelectItem>
              </SelectContent>
            </Select>
            {category === "custom" && (
              <Input
                value={customCategory}
                onChange={handleCustomCategoryChange}
                placeholder="Enter custom category"
                className="mt-2 w-full bg-white/5 text-white"
              />
            )}
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags (comma-separated)
            </label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-white/5 text-white"
            />
          </div>
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium mb-1">
              Featured Image
            </label>
            <Input
              id="featuredImage"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full bg-white/5 text-white"
            />
            {featuredImage && (
              <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="mt-2 max-w-xs rounded" />
            )}
          </div>
          <div className="flex items-center">
            <input
              id="isFeatured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">
              Featured Post
            </label>
          </div>
          <div className="flex gap-4">
            <Button type="submit" className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => router.push("/admin/blogs")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

