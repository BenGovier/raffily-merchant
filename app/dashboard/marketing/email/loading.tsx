import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-10 w-64 mb-6" />

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-md mb-8" />
          <Skeleton className="h-40 w-full mb-4" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full max-w-xs mb-8" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="border rounded-lg p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full max-w-xs mb-8" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

