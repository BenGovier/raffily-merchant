import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <Skeleton className="h-4 w-full max-w-md mt-1" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-10 w-full max-w-sm" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="rounded-md border">
            <div className="p-4 flex justify-center items-center flex-col">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-300 mb-2" />
              <Skeleton className="h-4 w-40 mt-2" />
            </div>
            <div className="p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 mb-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
