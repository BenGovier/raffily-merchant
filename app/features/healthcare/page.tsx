import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, TrendingUp } from "lucide-react"
import SimpleCTA from "@/components/ui/simple-cta"

export default function HealthcareFeaturePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Healthcare Engagement Solutions</h1>
              <p className="text-xl text-white/90 mb-8">
                Raffily helps healthcare providers improve patient engagement, increase preventive care participation,
                and gather valuable health insights through compliant raffle campaigns.
              </p>
              <div className="flex space-x-8">
                <Button
                  asChild
                  variant="outline"
                  className="text-[#0A1F44] border-white bg-white hover:bg-gray-100 hover:text-[#0A1F44]"
                >
                  <Link href="/request-demo">Book a Demo</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-[#0A1F44]"
                >
                  <Link href="/apply">Start Free Trial</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthcare.jpg-CtgKyoEC3PvuWktDrekOlNE6zHX7zL.jpeg"
                alt="Healthcare Engagement"
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
            Benefits for Healthcare Providers
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Heart className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Improved Patient Engagement</h3>
              <p className="text-gray-600">
                Increase participation in preventive care programs and follow-up appointments through engaging raffle
                incentives.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <TrendingUp className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Higher Email Open Rates</h3>
              <p className="text-gray-600">
                Boost patient communication effectiveness with raffle-powered emails that see up to 220% higher open
                rates.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <Users className="w-12 h-12 text-[#00B8A9] mb-4" />
              <h3 className="text-xl font-bold text-[#0A1F44] mb-2">Valuable Patient Insights</h3>
              <p className="text-gray-600">
                Gather critical health data and feedback through custom questions during the raffle entry process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A1F44] mb-12">
            Success Story: HealthFirst Clinic Network
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Challenge</h3>
                <p className="text-gray-600 mb-6">
                  HealthFirst Clinic Network was struggling with low email engagement and poor patient adherence to
                  preventive care and follow-up appointments.
                </p>
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-4">Solution</h3>
                <p className="text-gray-600 mb-6">
                  They implemented Raffily's healthcare-optimized raffle platform to incentivize preventive care and
                  improve communication.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-[#0A1F44] mb-2">Results:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Email open rates increased by 180%</li>
                    <li>Preventive care visits up by 50%</li>
                    <li>Follow-up appointment attendance improved by 45%</li>
                    <li>Patient satisfaction scores increased by 32%</li>
                  </ul>
                </div>
              </div>

              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthcare-case-study.jpg"
                  alt="Healthcare Case Study"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Transform Your Patient Engagement</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join the growing number of healthcare providers using Raffily to improve patient outcomes and drive better
            engagement.
          </p>
          <SimpleCTA href="/request-demo">Book Demo</SimpleCTA>
        </div>
      </section>

      <Footer />
    </main>
  )
}
