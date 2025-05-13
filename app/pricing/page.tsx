import PricingMatrix from "@/components/PricingMatrix"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">Flexible Pricing for Your Needs</h1>
        <p className="text-xl text-center text-white/80 mb-12 max-w-3xl mx-auto">
          Choose the plan that fits your business. Whether you're just starting or running multiple campaigns, we have
          options for everyone.
        </p>
        <PricingMatrix />
      </main>
      <Footer />
    </div>
  )
}

