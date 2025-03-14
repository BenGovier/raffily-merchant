"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, FileText, Plus, Search, Trash } from "lucide-react"
import { initializeBlogData } from "@/lib/blog-utils"

export default function AdminBlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    // Initialize blog data
    initializeBlogData()

    // Load blog posts from localStorage
    const storedPosts = localStorage.getItem("blogPosts")
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts))
    }
  }, [])

  const filteredPosts = (status: string) => {
    return blogPosts
      .filter((post) => post.status === status)
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedPosts = blogPosts.filter((post) => post.id !== postId)
      setBlogPosts(updatedPosts)
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
    }
  }

  const handleToggleFeatured = (postId: string) => {
    const updatedPosts = blogPosts.map((post) => (post.id === postId ? { ...post, featured: !post.featured } : post))
    setBlogPosts(updatedPosts)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
  }

  const handlePublishPost = (postId: string) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === postId && post.status === "draft"
        ? { ...post, status: "published", publishDate: new Date().toISOString() }
        : post,
    )
    setBlogPosts(updatedPosts)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog content</p>
          </div>
          <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
            <Link href="/admin/blogs/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="published" className="space-y-6">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          {["published", "draft"].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {filteredPosts(status).length === 0 ? (
                  <div className="text-center py-12 bg-background border rounded-lg">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No {status} posts found</h3>
                    <p className="text-muted-foreground mb-6">
                      {status === "published"
                        ? "You don't have any published blog posts yet."
                        : "You don't have any draft blog posts."}
                    </p>
                    <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white" asChild>
                      <Link href="/admin/blogs/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Post
                      </Link>
                    </Button>
                  </div>
                ) : (
                  filteredPosts(status).map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-medium text-lg">{post.title}</h3>
                              {post.featured && <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>}
                              <Badge className="bg-[#00B8A9]">{post.category}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <div>Author: {post.author}</div>
                              {post.status === "published" && (
                                <>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(post.publishDate).toLocaleDateString()}
                                  </div>
                                  <div>{post.readTime}</div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/blogs/edit/${post.id}`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant={post.featured ? "outline" : "default"}
                              size="sm"
                              className={post.featured ? "" : "bg-yellow-600 hover:bg-yellow-700 text-white"}
                              onClick={() => handleToggleFeatured(post.id)}
                            >
                              {post.featured ? "Unfeature" : "Feature"}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                            {post.status === "published" && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/blog/${post.id}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </Button>
                            )}
                            {post.status === "draft" && (
                              <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                                size="sm"
                                onClick={() => handlePublishPost(post.id)}
                              >
                                Publish
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

