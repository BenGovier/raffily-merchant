"use client"

import { useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Star, Users, TrendingUp } from "lucide-react"

export default function HospitalityFeaturePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hospitality Engagement Solutions</h1>
              <p className="text-xl text-white/90 mb-8">
                Raffily helps hotels, restaurants, and hospitality businesses enhance guest experiences, boost repeat
                visits, and gather valuable customer insights through engaging raffle campaigns.
              </p>
              <div className="flex space-x-8">
                <Link href="/request-demo">
                  <button className="px-4 py-2 bg-white text-[#0A1F44] font-medium rounded-md border border-white hover:bg-gray-100">
                    Book a Demo
                  </button>
                </Link>
                <Link href="/apply">
                  <button className="px-4 py-2 bg-white text-[#0A1F44] font-medium rounded-md border border-white hover:bg-gray-100">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospitality.jpg-apgIv1P5ny4dcaDbyOvyMrWbcfpvM4.jpeg"
                alt="Hospitality Engagement"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Benefits for Hospitality Businesses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Star className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Enhanced Guest Experience</h3>
              <p className="text-gray-600">
                Create memorable experiences that keep guests coming back through exciting raffle opportunities.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <TrendingUp className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Increased Repeat Visits</h3>
              <p className="text-gray-600">
                Boost customer retention and loyalty with engaging raffle campaigns that incentivize return visits.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Users className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Valuable Guest Insights</h3>
              <p className="text-gray-600">
                Collect critical feedback and preferences through custom questions during the raffle entry process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Success Story: Luxury Hotel Chain
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Challenge</h3>
                <p className="text-gray-600 mb-6">
                  A luxury hotel chain was struggling with declining email engagement and wanted to increase guest
                  participation in their loyalty program.
                </p>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Solution</h3>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's hospitality-optimized raffle platform to create exciting stay upgrade
                  opportunities and gather guest preferences.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Results:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Email open rates increased by 165%</li>
                    <li>Loyalty program sign-ups increased by 40%</li>
                    <li>Repeat bookings improved by 35%</li>
                    <li>Collected valuable data on guest preferences</li>
                  </ul>
                </div>
              </div>

              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospitality-case-study.jpg"
                  alt="Hospitality Case Study"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Guest Engagement</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the growing number of hospitality businesses using Raffily to enhance guest experiences and drive
            better engagement.
          </p>
          <Link href="/request-demo">
            <button className="px-6 py-3 bg-white text-[#0A1F44] font-medium rounded-md border border-white hover:bg-gray-100">
              Book Demo
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
