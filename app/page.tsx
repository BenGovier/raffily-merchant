import MainNav from "@/components/MainNav"
import HeroSection from "@/components/HeroSection"
import TrustedBy from "@/components/TrustedBy"
import WhatIsRaffily from "@/components/WhatIsRaffily"
import FeatureSection from "@/components/FeatureSection"
import HowItWorks from "@/components/HowItWorks"
import IndustrySolutions from "@/components/IndustrySolutions"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BusinessTypeSelector from "@/components/BusinessTypeSelector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A1F44]">
      <MainNav />
      <HeroSection />
      <TrustedBy />
      <WhatIsRaffily />
      <FeatureSection />
      <BusinessTypeSelector />
      <HowItWorks />
      <IndustrySolutions />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0A1F44] mb-8">Boost Your Email Open Rates with Raffily</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how Raffily can significantly improve your email engagement. Use our interactive tool to see the
            potential impact on your campaigns.
          </p>
          <Button asChild size="lg" className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
            <Link href="/auth/register">
              Start Engaging More Customers <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}

