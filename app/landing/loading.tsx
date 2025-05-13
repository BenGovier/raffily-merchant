import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="bg-white py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Skeleton className="h-10 w-40" />
          <div className="hidden md:flex space-x-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-[#1E0B36] to-[#4B1248] py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mb-2" />
            <Skeleton className="h-6 w-4/6 mb-8" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Skeleton className="w-full max-w-md h-[400px] rounded-lg" />
          </div>
        </div>
      </section>

      {/* Rest of the skeletons would follow the same pattern */}
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

