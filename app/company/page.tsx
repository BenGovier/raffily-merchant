import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Shield, Target, Zap, Newspaper } from "lucide-react"

export default function CompanyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <MainNav />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/corporate-meeting.jpg-Wd0Aw4Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy"
            alt="Raffily Corporate Meeting"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E0B36]/90 to-[#1E0B36]/70" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Revolutionizing Customer Engagement</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Raffily is the global leader in data-driven raffle solutions, trusted by Fortune 500 companies and
              innovative startups alike.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6">
              Explore Our Solutions
            </Button>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">Our Mission and Values</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">Mission</h3>
                <p className="text-gray-700 mb-6">
                  At Raffily, our mission is to revolutionize customer engagement through innovative, data-driven raffle
                  solutions. We strive to create meaningful connections between businesses and their customers,
                  fostering loyalty and driving growth.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Target className="w-6 h-6 text-accent mr-2" />
                    <span className="text-gray-700">
                      Innovation: Constantly pushing the boundaries of engagement technology
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-6 h-6 text-accent mr-2" />
                    <span className="text-gray-700">
                      Integrity: Upholding the highest standards of ethics and compliance
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Users className="w-6 h-6 text-accent mr-2" />
                    <span className="text-gray-700">
                      Customer-Centric: Putting our clients' needs at the heart of everything we do
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-6 h-6 text-accent mr-2" />
                    <span className="text-gray-700">
                      Excellence: Striving for the highest quality in all our solutions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About Raffily */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-[#1E0B36] mb-8 text-center">About Raffily</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Founded in 2015, Raffily has quickly become the industry standard for data-driven raffle solutions. Our
                enterprise-grade platform combines cutting-edge technology with deep marketing insights, enabling
                businesses to create engaging campaigns that drive measurable results.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                With offices in New York, London, and Singapore, we serve a global clientele ranging from Fortune 500
                companies to innovative startups. Our team of over 200 professionals includes data scientists, marketing
                strategists, and compliance experts, ensuring that every aspect of your raffle campaign is optimized for
                success.
              </p>
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">Join Our Team</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-700 mb-8">
                We're always looking for talented individuals to join our growing team. At Raffily, you'll have the
                opportunity to work on cutting-edge technology and shape the future of customer engagement.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
                <Link href="/careers">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Raffily in the News */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">Raffily in the News</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <Newspaper className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-[#1E0B36] mb-2">Raffily Raises $50M in Series B Funding</h3>
                <p className="text-gray-700 mb-4">TechCrunch - May 15, 2023</p>
                <Link href="#" className="text-accent hover:underline">
                  Read More
                </Link>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <Newspaper className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-[#1E0B36] mb-2">
                  How Raffily is Transforming Customer Engagement
                </h3>
                <p className="text-gray-700 mb-4">Forbes - April 3, 2023</p>
                <Link href="#" className="text-accent hover:underline">
                  Read More
                </Link>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <Newspaper className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-[#1E0B36] mb-2">
                  Raffily Named in Top 10 MarTech Startups to Watch
                </h3>
                <p className="text-gray-700 mb-4">Business Insider - March 22, 2023</p>
                <Link href="#" className="text-accent hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#1E0B36]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Marketing Strategy?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the ranks of industry leaders leveraging Raffily's enterprise-grade platform for unparalleled
              customer engagement and data insights.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6">
              Request a Demo <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

