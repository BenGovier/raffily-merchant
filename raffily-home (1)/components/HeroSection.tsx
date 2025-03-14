"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1F44]">
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            The Raffle Platform for Customer Retention
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8">
            Boost email opens, reduce churn, and capture actionable insights with two bespoke entry questions—loyalty as
            a service, made simple.
          </p>
          <Link href="/contact">
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white text-lg px-8 py-6 h-14">Book Demo</Button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[300px] md:w-[400px] lg:w-[500px] h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/httpsmeet.google.comomw-vsip-zrdauthuser%3D3%26hl%3Den_GB%20%281%29-MaaEsNabC0T4pm0P35FD5ym7hXeZZ5.png"
              alt="Raffily app interface showing raffle campaigns and questionnaires"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

