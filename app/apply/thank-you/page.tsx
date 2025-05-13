import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00B8A9]/20 mb-6">
              <CheckCircle className="h-8 w-8 text-[#00B8A9]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-xl text-white/90 mb-8">
              We've received your application and we'll be in touch soon. Our team is looking forward to helping you
              transform your customer engagement strategy.
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
              <p className="text-white/90 mb-4">
                One of our representatives will contact you within the next 24-48 business hours to discuss your
                specific needs and how Raffily can help your business grow.
              </p>
              <p className="text-white/90">
                In the meantime, feel free to explore our resources and learn more about what Raffily has to offer.
              </p>
            </div>

            <div className="space-x-4">
              <Button asChild className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white">
                <Link href="/resources">
                  Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-[#0A1F44]">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
