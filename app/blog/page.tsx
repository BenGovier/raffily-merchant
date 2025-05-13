import { Suspense } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import BlogHero from "@/components/blog/BlogHero"
import BlogGrid from "@/components/blog/BlogGrid"
import BlogSidebar from "@/components/blog/BlogSidebar"
import BlogSearch from "@/components/blog/BlogSearch"
import { Loader } from "lucide-react"

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string }
}) {
  const category = searchParams.category || ""
  const tag = searchParams.tag || ""
  const searchQuery = searchParams.search || ""

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />
      <div className="container mx-auto px-4 py-12 mt-20">
        <BlogHero />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div className="lg:w-3/4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
              <BlogSearch />
            </div>

            <Suspense
              fallback={
                <div className="flex justify-center py-20">
                  <Loader className="animate-spin text-white" size={48} />
                </div>
              }
            >
              <BlogGrid category={category} tag={tag} searchQuery={searchQuery} />
            </Suspense>
          </div>

          <div className="lg:w-1/4">
            <BlogSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
