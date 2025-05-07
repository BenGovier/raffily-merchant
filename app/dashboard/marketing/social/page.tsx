import SocialMediaAdGenerator from "@/components/marketing/SocialMediaAdGenerator"

export default function SocialMediaPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Social Media Marketing</h1>
        <a href="/dashboard/marketing" className="text-[#00B8A9] hover:text-[#00B8A9]/80 flex items-center">
          ← Back to Marketing Hub
        </a>
      </div>

      <SocialMediaAdGenerator />
    </div>
  )
}
