import { Suspense } from "react"
import type { Metadata } from "next"
import RaffleDetailsClient from "./RaffleDetailsClient"
import Loading from "./loading"

interface RafflePageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function RafflePage({ params }: RafflePageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Raffle Details</h1>
      <Suspense fallback={<Loading />}>
        <RaffleDetailsClient id={params.id} />
      </Suspense>
    </div>
  )
}

export async function generateMetadata({ params }: RafflePageProps): Promise<Metadata> {
  return {
    title: `Raffle ${params.id} | Raffily Dashboard`,
  }
}
