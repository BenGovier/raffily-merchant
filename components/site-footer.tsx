import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Blog
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Jobs
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Press
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Terms
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Privacy
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/footer-logo-Yu-JxGFd.png"
            alt="Raffily"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </div>
        <p className="mt-8 text-center text-base text-gray-400">&copy; 2023 Raffily, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
