import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Merchant Details",
  description: "View merchant details",
}

// @ts-ignore - Bypass type checking for this component
export default function Page(props) {
  const id = props.params?.id

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Merchant Details {id}</h1>
      {/* Rest of your component */}
    </div>
  )
}
