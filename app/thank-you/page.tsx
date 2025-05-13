import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, Mail, ArrowRight } from "lucide-react"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E0B36] to-[#4B1248] text-white flex flex-col justify-center items-center px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-lg shadow-2xl p-8 md:p-12">
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20-%202025-02-28T144519.340-ekdWW2jBp04gUM8lYXnet21xvZyUxS.png"
            alt="Raffily Logo"
            width={180}
            height={60}
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Booking a Demo!</h1>
          <p className="text-xl text-gray-300">
            We're excited to show you how Raffily can transform your customer engagement.
          </p>
        </div>

        <div className="bg-white/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Calendar className="w-6 h-6 mr-4 text-pink-400" />
              <span>Check your email for a calendar invite</span>
            </li>
            <li className="flex items-center">
              <Clock className="w-6 h-6 mr-4 text-pink-400" />
              <span>Prepare for a 30-minute session with our expert</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-6 h-6 mr-4 text-pink-400" />
              <span>We'll send a reminder 1 hour before the demo</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="mb-4">Have questions before the demo?</p>
          <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white">
            <Link href="mailto:support@raffily.com" className="inline-flex items-center">
              Contact Support
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-400">
        <p>&copy; 2025 Raffily. All rights reserved.</p>
      </footer>
    </div>
  )
}

