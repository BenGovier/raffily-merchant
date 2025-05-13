import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Raffle Entries",
  description: "View raffle entries",
}

export default function Page({ params }: PageProps) {
  const id = params.id

  if (!id) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Entries for Raffle {id}</h1>
      {/* Rest of your component */}
    </div>
  )
}

