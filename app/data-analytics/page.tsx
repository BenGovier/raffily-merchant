import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import DataProjectionTool from "@/components/DataProjectionTool"

export default function DataAnalyticsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#1E0B36] to-[#4B1248]">
      <MainNav />
      <div className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Data Analytics</h1>
        <p className="text-xl text-white/80 mb-12">
          Discover the power of data-driven insights with Raffily. Our platform helps you collect valuable customer data
          with each raffle campaign, enabling you to make informed decisions and grow your business. Use the tool below
          to see how increasing email touchpoints during a raffle can significantly boost your data collection and
          customer engagement.
        </p>
        <DataProjectionTool />
      </div>
      <Footer />
    </main>
  )
}

