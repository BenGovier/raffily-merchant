import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import PricingToggle from "@/components/pricing/PricingToggle"
import MonthlyPlans from "@/components/pricing/MonthlyPlans"
import PayAsYouGo from "@/components/pricing/PayAsYouGo"
import PricingFAQ from "@/components/pricing/PricingFAQ"
import PricingCTA from "@/components/pricing/PricingCTA"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Simple Pricing That Scales With You
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose the plan that fits your business needs. All plans include access to our powerful raffle platform.
          </p>

          {/* Pricing Toggle Component */}
          <PricingToggle />

          {/* Monthly Plans Section */}
          <div className="mt-16" id="monthly-plans">
            <MonthlyPlans />
          </div>

          {/* Pay As You Go Section */}
          <div className="mt-24" id="pay-as-you-go">
            <PayAsYouGo />
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <PricingFAQ />
          </div>

          {/* CTA Section */}
          <div className="mt-24">
            <PricingCTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
