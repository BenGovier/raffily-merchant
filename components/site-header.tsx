import Link from "next/link"
import Image from "next/image"

const SiteHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/raffily-logo-ekdWW2jBp04gUM8lYXnet21xvZyUxS.png"
              alt="Raffily"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader

