import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2817%29-8FXlfWhC6BCHx9WltpCUOQSS9PsfGl.png"
                  alt="Raffily Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <p className="text-white/60">Transforming customer engagement through innovative raffle solutions</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[#00B8A9] transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60">&copy; {new Date().getFullYear()} Raffily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
