import Link from "next/link"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function BlogNotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
      <MainNav />
      <div className="container mx-auto px-4 py-12 mt-20 flex-grow flex items-center justify-center">
        <div className="text-center max-w-md">
          <FileQuestion className="h-24 w-24 text-[#fd8e8e] mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-[#fd8e8e] to-[#ff7855] hover:from-[#ff7855] hover:to-[#fd8e8e] text-white"
          >
            <Link href="/blog">Browse All Articles</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}

