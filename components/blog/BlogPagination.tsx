"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }

    router.push(`/blog?${params.toString()}`)
  }

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than the max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1) // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(-2) // -2 represents ellipsis
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pageNumbers.map((page, index) =>
        page < 0 ? (
          <span key={`ellipsis-${index}`} className="text-white/50">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => navigateToPage(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              currentPage === page
                ? "bg-gradient-to-r from-[#fd8e8e] to-[#ff7855] text-white"
                : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
