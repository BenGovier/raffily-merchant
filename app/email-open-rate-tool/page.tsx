import PageLayout from "@/components/PageLayout"
import EmailOpenRateTool from "@/components/EmailOpenRateTool"

export default function EmailOpenRateToolPage() {
  return (
    <PageLayout>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Email Open Rate Improvement Tool</h1>
      <p className="text-xl text-white/80 mb-8">
        See how Raffily can significantly boost your email open rates and get your customers excited.
      </p>
      <EmailOpenRateTool />
    </PageLayout>
  )
}
