import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-10 w-64 mb-6" />

      <div className="grid grid-cols-4 gap-2 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10" />
        ))}
      </div>

      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  )
}
