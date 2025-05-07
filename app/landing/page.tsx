import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="w-40">
            <Image
              src="/footer_logo-Yu-JxGFd.png"
              alt="Raffily Logo"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-700 hover:text-accent">
              Features
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-accent">
              Benefits
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-accent">
              Testimonials
            </Link>
          </div>
          <div>
            <Button asChild className="bg-accent hover:bg-accent/90 text-white">
              <Link href="#demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E0B36] to-[#4B1248] py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Boost Customer Retention with Engaging Raffles
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Increase email open rates by 250% and collect valuable customer insights with Raffily's raffle platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
                <Link href="#demo">Book a Demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="#features">See Features</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/httpsmeet.google.comomw-vsip-zrdauthuser%3D3%26hl%3Den_GB%20%281%29-MaaEsNabC0T4pm0P35FD5ym7hXeZZ5.png"
                alt="Raffily Dashboard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 mb-6">TRUSTED BY LEADING BRANDS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-24 h-12 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image src="/placeholder.svg?height=48&width=96" alt="Brand 1" fill className="object-contain" />
            </div>
            <div className="w-24 h-12 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image src="/placeholder.svg?height=48&width=96" alt="Brand 2" fill className="object-contain" />
            </div>
            <div className="w-24 h-12 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image src="/placeholder.svg?height=48&width=96" alt="Brand 3" fill className="object-contain" />
            </div>
            <div className="w-24 h-12 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image src="/placeholder.svg?height=48&width=96" alt="Brand 4" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Powerful Features to Engage Your Customers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Raffily provides everything you need to create, manage, and analyze successful raffle campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-Yx9Yd9Ij9Yd9Ij9Yd9Ij.jpg"
                  alt="Dashboard Analytics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">Comprehensive Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Track entries, conversions, and customer insights in real-time with our powerful analytics dashboard.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Real-time entry tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Conversion analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Customer insight reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-64">
                <Image
                  src="/placeholder.svg?height=256&width=512"
                  alt="Marketing Tools"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">AI-Powered Marketing Tools</h3>
                <p className="text-gray-600 mb-4">
                  Generate social media ads, email subject lines, and marketing content with our AI tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Social media ad generator</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Email subject line creator</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>SMS campaign management</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-64">
                <Image
                  src="/placeholder.svg?height=256&width=512"
                  alt="Raffle Management"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">Easy Raffle Management</h3>
                <p className="text-gray-600 mb-4">
                  Create and manage raffles with our intuitive dashboard. Set up entry methods, prizes, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Drag-and-drop raffle builder</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Automated winner selection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Customizable entry forms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
              <div className="relative w-full h-64">
                <Image
                  src="/placeholder.svg?height=256&width=512"
                  alt="Customer Insights"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">Customer Insights</h3>
                <p className="text-gray-600 mb-4">
                  Collect valuable data from your customers with customizable questions and surveys.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Customizable questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Data export options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-accent mr-2 h-5 w-5" />
                    <span>Segmentation tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Businesses Choose Raffily</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of businesses that have transformed their customer engagement with Raffily.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-accent mb-4">250%</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Increased Email Opens</h3>
              <p className="text-gray-600">Average increase in email open rates for businesses using Raffily.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-accent mb-4">10x</div>
              <h3 className="text-xl font-semibold text-primary mb-2">More Customer Data</h3>
              <p className="text-gray-600">
                Collect up to 10 times more customer insights compared to traditional methods.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-accent mb-4">98%</div>
              <h3 className="text-xl font-semibold text-primary mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Customers love participating in raffles, leading to higher engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses that have transformed their customer engagement with Raffily.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Raffily has completely transformed our customer engagement strategy. We've seen a 300% increase in
                email open rates and collected valuable insights from our customers."
              </p>
              <div>
                <p className="font-semibold text-primary">Sarah Johnson</p>
                <p className="text-gray-500">Marketing Director, E-commerce Brand</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The AI-powered marketing tools have saved us countless hours. We can now generate professional social
                media ads and email campaigns in minutes."
              </p>
              <div>
                <p className="font-semibold text-primary">Michael Chen</p>
                <p className="text-gray-500">CEO, Retail Chain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-16 bg-gradient-to-r from-[#1E0B36] to-[#4B1248] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Engagement?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a demo today and see how Raffily can help you boost email open rates, collect customer insights, and
            increase retention.
          </p>
          <form className="max-w-md mx-auto bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-white py-3 text-lg">Book My Demo</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/footer_logo-Yu-JxGFd.png"
                alt="Raffily Logo"
                width={160}
                height={50}
                className="object-contain mb-4"
              />
              <p className="text-white/70">The raffle platform for customer retention and engagement.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Marketing Tools
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Raffle Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Customer Insights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50">
            <p>© {new Date().getFullYear()} Raffily. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
