import { getRaffleById } from "@/lib/raffle-service"
import RaffleDetails from "@/components/admin/raffle-details"

interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function RafflePage({ params }: PageProps) {
  const raffle = await getRaffleById(params.id)

  return (
    <div className="container mx-auto py-8">
      <RaffleDetails raffle={raffle} />
    </div>
  )
}

