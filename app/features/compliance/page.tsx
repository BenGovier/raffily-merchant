"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function CompliancePage() {
  useEffect(() => {
    // Ensure the page scrolls to top on load
    window.scrollTo(0, 0)
  }, [])

  const handleDownloadGuide = () => {
    // In a real implementation, this would download the PDF
    const guideUrl = "/downloads/raffily-compliance-guide.pdf"
    window.open(guideUrl, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - Explicitly positioned */}
      <div className="w-full z-50">
        <MainNav />
      </div>

      {/* Hero Section - Exact match to screenshot */}
      <section className="bg-[#0A1F44] py-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                TEST CHANGE - Compliance & Peace of Mind
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Different countries, different rules—but we've got you covered. Raffily makes it easy to run legally
                compliant, free-entry raffles across the UK, US, Europe, and beyond.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#country-rules"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white rounded-md text-base font-medium text-white bg-transparent hover:bg-white hover:text-[#0A1F44] transition-colors"
                >
                  Check Raffle Rules in Your Country
                </a>
                <button
                  onClick={handleDownloadGuide}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
                >
                  Start a Global Raffle Today
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#00B8A9]" />
                  <span className="text-white">100% Free-Entry Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#00B8A9]" />
                  <span className="text-white">GDPR & Data Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-[#00B8A9]" />
                  <span className="text-white">Country-Specific Legal Guidance</span>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%202%20%281%29-1JuczKsCZbf0AJ2OwWQ2IoX3GCTAaa.png"
                alt="Compliance document with gavel"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Country Rules Section */}
      <section id="country-rules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            How Free Raffles Work in Different Countries
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-3">United Kingdom</h3>
                <p className="text-gray-700">
                  UK raffles must follow Gambling Commission guidelines. Raffily ensures your promotions include free
                  entry options and clear terms to avoid gambling regulations.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-3">European Union</h3>
                <p className="text-gray-700">
                  EU regulations require GDPR compliance and transparent promotional terms. Raffily handles both
                  automatically for all European campaigns.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-3">United States</h3>
                <p className="text-gray-700">
                  US sweepstakes laws vary by state. Raffily's platform includes the necessary free entry options and
                  disclosures to keep you compliant nationwide.
                </p>
              </div>

              <button
                onClick={handleDownloadGuide}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors"
              >
                Download our Raffle Compliance Guide
              </button>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%202%20%281%29-1JuczKsCZbf0AJ2OwWQ2IoX3GCTAaa.png"
                alt="Global compliance documentation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
