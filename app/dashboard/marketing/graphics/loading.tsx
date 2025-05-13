import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-10 w-64 mb-6" />

      <div className="border rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>

        <Skeleton className="h-8 w-96 mx-auto mb-4" />
        <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2" />
        <Skeleton className="h-4 w-full max-w-xl mx-auto mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="border rounded-lg p-4">
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-full max-w-xs mx-auto" />
          </div>

          <div className="border rounded-lg p-4">
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-full max-w-xs mx-auto" />
          </div>

          <div className="border rounded-lg p-4">
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-full max-w-xs mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

