"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function WhatIsRaffily() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E0B36] mb-6">
              Turn Your Superfans with Free Raffles
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Struggling to boost engagement and sales? Raffily helps businesses like yours create exciting raffles that
              turn casual visitors into loyal customers—without the hassle.
            </p>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E0B36] text-lg mb-1">More Clicks, More Conversions</h3>
                  <p className="text-gray-600">
                    Your emails become irresistible—free raffles can increase open rates by 40%, driving more traffic
                    and higher sales.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E0B36] text-lg mb-1">Know Your Customers, Sell Smarter</h3>
                  <p className="text-gray-600">
                    Use quick survey questions during entry to collect valuable insights. Discover what customers want
                    and sell more effectively.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E0B36] text-lg mb-1">Legally Secure, Stress-Free Raffles</h3>
                  <p className="text-gray-600">
                    We handle all compliance and regulations—so you can grow your business with zero risk of legal
                    headaches.
                  </p>
                </div>
              </li>
            </ul>
            <Link href="/apply">
              <button className="inline-flex items-center px-6 py-3 bg-[#00B8A9] text-white font-medium rounded-md hover:bg-[#00B8A9]/90">
                Start Engaging More Customers <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Phone Display Section */}
          <div className="relative flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WIN%20-%20%C2%A32%2C000%20CASH%20With%20Tandem%20Bank%20%283%29-19gKJyJnslbDlqg7zqm3sNtp1rMtMr.png"
              alt="Raffily mobile app showing a Tandem Bank cash prize raffle"
              width={600}
              height={1000}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

