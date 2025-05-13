"use client"

import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Users, TrendingUp } from "lucide-react"
import { useEffect } from "react"

export default function LeisureFeaturePage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Leisure & Spa Engagement Solutions</h1>
              <p className="text-xl text-white/90 mb-8">
                Raffily helps spas and leisure facilities boost bookings, increase member retention, and gather valuable
                customer feedback through engaging raffle campaigns.
              </p>
              <div className="flex space-x-8">
                {/* Direct HTML buttons with explicit styling */}
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2822%29-GljQZb0t0NkwRuoaljOTDQGIVKgkRC.png"
                alt="Spa and Leisure Engagement"
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
            Benefits for Spa & Leisure Facilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Sparkles className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Enhanced Member Experience</h3>
              <p className="text-gray-600">
                Create exciting opportunities for members to win premium treatments and experiences.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <TrendingUp className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Increased Bookings</h3>
              <p className="text-gray-600">
                Drive more bookings and membership sign-ups through engaging raffle campaigns.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Users className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Valuable Customer Insights</h3>
              <p className="text-gray-600">
                Gather feedback on treatment preferences and member satisfaction through custom questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Success Story: Serenity Spa Group
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Challenge</h3>
                <p className="text-gray-600 mb-6">
                  A luxury spa chain was experiencing declining email engagement and wanted to increase treatment
                  bookings during off-peak hours.
                </p>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Solution</h3>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's spa-optimized raffle platform to create exciting treatment giveaways and
                  gather customer preferences.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Results:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Email open rates increased by 175%</li>
                    <li>Off-peak bookings improved by 45%</li>
                    <li>Member retention rate up by 35%</li>
                    <li>Collected valuable data on treatment preferences</li>
                  </ul>
                </div>
              </div>

              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2822%29-GljQZb0t0NkwRuoaljOTDQGIVKgkRC.png"
                  alt="Spa Case Study"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Spa & Leisure Engagement</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the growing number of spa and leisure facilities using Raffily to enhance customer experiences and
            drive better engagement.
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

