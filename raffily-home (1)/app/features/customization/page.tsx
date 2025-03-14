"use client"

import { useEffect } from "react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { PaintbrushIcon as PaintBrush, Layout, Palette, Layers } from "lucide-react"

export default function CustomizationPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Customizable & On-Brand Raffles</h1>
              <p className="text-xl text-white/90 mb-8">
                Easily tailor raffle pages to match your brand's look and feel, ensuring a cohesive experience across
                all customer touchpoints.
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2849%29.jpg-oS7bhVhrelVRqrYhaDH9emKep17yth.jpeg"
                alt="Customization and Branding"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Customization Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">Customization Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <PaintBrush className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Brand Colors & Logos</h3>
              <p className="text-gray-600">
                Apply your brand colors, logos, and imagery to create a seamless brand experience throughout the raffle
                journey.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Layout className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Flexible Layouts</h3>
              <p className="text-gray-600">
                Choose from multiple layout options or create custom designs to match your website and marketing
                materials.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Palette className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Custom Themes</h3>
              <p className="text-gray-600">
                Save and reuse your branded themes across multiple raffles for consistent branding and efficient
                campaign creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Examples */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">Customization in Action</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fashion-raffle-example.jpg"
                  alt="Fashion Raffle Example"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Fashion Retailer</h3>
                <p className="text-gray-600 mb-4">
                  This fashion brand created a sleek, minimalist raffle design that perfectly matches their high-end
                  aesthetic, using their signature black and gold color scheme.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Custom Typography</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Brand Colors</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Product Imagery</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/food-raffle-example.jpg"
                  alt="Restaurant Raffle Example"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Restaurant Chain</h3>
                <p className="text-gray-600 mb-4">
                  This restaurant created a vibrant, appetizing raffle page featuring food photography and their
                  signature red branding to promote a dinner giveaway.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Food Imagery</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Custom Background</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">Branded Elements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Simple Customization Process
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Easy Brand Implementation</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1F44] mb-1">Upload Brand Assets</h4>
                    <p className="text-gray-600">
                      Add your logo, brand colors, and custom images to your Raffily account.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1F44] mb-1">Choose Your Template</h4>
                    <p className="text-gray-600">Select from pre-designed templates or start with a blank canvas.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1F44] mb-1">Customize Elements</h4>
                    <p className="text-gray-600">
                      Modify colors, fonts, images, and layout to match your brand guidelines.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1F44] mb-1">Save & Reuse</h4>
                    <p className="text-gray-600">
                      Save your branded template for future raffles to maintain consistency.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/customization-process.jpg"
                alt="Customization Process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Customization */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Advanced Customization Options
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Layers className="w-12 h-12 text-[#00B8A9] mb-4" />
                <h3 className="text-xl font-bold text-[#0A1F44] mb-4">For Technical Teams</h3>
                <p className="text-gray-600 mb-4">
                  Raffily offers advanced customization options for businesses with technical resources who want
                  complete control over their raffle experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">Custom CSS options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">JavaScript customization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">API integration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">Embedded raffle widgets</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A1F44] mb-4">Enterprise Solutions</h3>
                <p className="text-gray-600 mb-4">
                  For enterprise clients, we offer fully custom solutions that can be tailored to specific business
                  requirements and integrated with existing systems.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">White-label solutions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">Custom development</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">Enterprise integrations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00B8A9] flex items-center justify-center text-white mr-2 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-600">Dedicated support team</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Create Your Branded Raffle Experience</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the growing number of businesses using Raffily to create customized, branded raffle experiences that
            engage customers and drive results.
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

