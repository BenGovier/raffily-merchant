"use client"

import { notFound } from "next/navigation"

export default function MerchantDetailsClient({ id }: { id: string }) {
  if (!id) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Merchant Details {id}</h1>
      {/* Rest of your component */}
    </div>
  )
}
