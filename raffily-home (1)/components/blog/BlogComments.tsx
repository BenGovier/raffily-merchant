"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { User, MessageSquare } from "lucide-react"

// This would normally come from a database or API
const initialComments = [
  {
    id: 1,
    name: "Alex Johnson",
    date: "2023-11-16",
    content: "Great article! I especially liked the insights on hyper-personalization.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    date: "2023-11-15",
    content:
      "This was really helpful for understanding where customer engagement is headed. Looking forward to implementing some of these strategies.",
  },
]

export default function BlogComments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !name.trim() || !email.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newCommentObj = {
        id: comments.length + 1,
        name,
        date: new Date().toISOString().split("T")[0],
        content: newComment,
      }

      setComments([newCommentObj, ...comments])
      setNewComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#fd8e8e] focus:ring-[#fd8e8e]"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#fd8e8e] focus:ring-[#fd8e8e]"
          />
          <Input
            type="email"
            placeholder="Your Email (not published)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-[#fd8e8e] focus:ring-[#fd8e8e]"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#fd8e8e] to-[#ff7855] hover:from-[#ff7855] hover:to-[#fd8e8e] text-white"
        >
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-b border-white/10 pb-6 last:border-0"
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{comment.name}</h4>
                  <p className="text-sm text-white/50">{comment.date}</p>
                </div>
              </div>
              <p className="text-white/80 pl-10">{comment.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

