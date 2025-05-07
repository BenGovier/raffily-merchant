import Image from "next/image"
import PageLayout from "@/components/PageLayout"
import { Button } from "@/components/ui/button"
import EmailImpactCalculator from "@/components/EmailImpactCalculator"
import EmailStrategies from "@/components/EmailStrategies"

export default function EmailEngagementPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Boost Email Open Rates & Drive More Engagement with Raffily
            </h1>
            <p className="text-xl text-white/80 mb-8">
              See how businesses increase email engagement by up to 200% with raffle-powered email strategies. Try our
              Email Impact Calculator to discover your potential uplift!
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 h-auto"
            >
              Try the Email Impact Calculator
            </Button>
          </div>

          {/* Email Impact Calculator */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <EmailImpactCalculator />
          </div>
        </div>
      </section>

      {/* How Raffily Boosts Email Performance */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How Raffily Boosts Email Performance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 rounded-xl p-6 transition-all hover:bg-white/15 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    />
                  </svg>
                </div>
                <div className="py-1.5 px-4 bg-accent/20 rounded-full">
                  <span className="text-accent font-bold">+100%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Higher Open Rates</h3>
              <p className="text-white/80">
                Raffle emails see up to 2x higher open rates compared to standard promotions, driving more eyes to your
                content.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 transition-all hover:bg-white/15 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div className="py-1.5 px-4 bg-accent/20 rounded-full">
                  <span className="text-accent font-bold">+35%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Increased Click-Through</h3>
              <p className="text-white/80">
                Links in raffle emails get 35% more clicks than regular marketing emails, boosting engagement and
                conversions.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 transition-all hover:bg-white/15 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/70 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="py-1.5 px-4 bg-accent/20 rounded-full">
                  <span className="text-accent font-bold">Reactivate</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">List Growth & Reactivation</h3>
              <p className="text-white/80">
                Raffles help revive inactive email subscribers by offering an incentive to engage with your brand again.
              </p>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="bg-white/10 rounded-xl p-6 md:p-8 max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-white text-center mb-6">Real Email Performance Improvement</h3>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="bg-white/10 rounded-lg p-4 mb-4 md:mb-0 w-full md:w-5/12 text-center">
                <h4 className="text-white/80 mb-2">Before Raffily</h4>
                <div className="text-4xl font-bold text-white mb-2">12%</div>
                <p className="text-white/80">Average Open Rate</p>
              </div>

              <div className="flex items-center justify-center w-full md:w-2/12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              <div className="bg-accent/20 rounded-lg p-4 w-full md:w-5/12 text-center">
                <h4 className="text-accent mb-2">After Raffily</h4>
                <div className="text-4xl font-bold text-white mb-2">30%</div>
                <p className="text-white/80">Average Open Rate</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 h-auto"
            >
              Want to see how much your emails could improve? Try our free Email Impact Calculator!
            </Button>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Success Story: Email Engagement
          </h2>

          <div className="bg-white/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              How an Online Store Increased Email Engagement by 200%
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">The Challenge</h4>
                <p className="text-white/80 mb-6">
                  An e-commerce store was struggling with low open rates and customer re-engagement. Their email list of
                  50,000 subscribers was largely inactive, with open rates hovering around 12%.
                </p>

                <h4 className="text-xl font-semibold text-white mb-2">The Solution</h4>
                <p className="text-white/80">
                  They implemented Raffily's email engagement strategy, using raffle-powered emails to reignite interest
                  in their brand and products. Each email offered a chance to win while collecting valuable customer
                  insights.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">The Results</h4>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      Open rates increased from <strong className="text-white">12% to 30%</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      Click-through rate jumped from <strong className="text-white">2% to 7%</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong className="text-white">5,000+ dormant subscribers</strong> re-engaged
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>
                      <strong className="text-white">32% increase</strong> in email-driven sales
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <blockquote className="text-lg italic text-white/90 mb-4">
                "Our email program was dying before Raffily. Now, it's one of our strongest channels. The engagement we
                see from our raffle emails is incredible, and the customer insights we gather help us improve our entire
                marketing strategy."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <span className="text-accent font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Jamie Davis</p>
                  <p className="text-white/70 text-sm">Marketing Director, Online Retailer</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70 text-center">*Email performance stats (blurred for privacy)</p>
              <div className="relative h-48 w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data%20dashboard%20image%20-guPAJhqHK56FVrRK0TdDyrvGRZC6jI.png"
                  alt="Email analytics dashboard showing improved open rates"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 h-auto"
            >
              See how other businesses are transforming email engagement—Try Raffily today!
            </Button>
          </div>
        </div>
      </section>

      {/* Effective Raffle Email Strategies */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Effective Raffle Email Strategies
          </h2>

          <EmailStrategies />

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 h-auto"
            >
              Start using high-converting email strategies today—Try Raffily Free!
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Revitalize Your Email Strategy with Raffily
            </h2>

            <div className="bg-white/10 rounded-xl p-6 mb-10">
              <div className="flex items-center justify-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-lg italic text-white/90 mb-2">
                "Since using Raffily, our email engagement has skyrocketed—open rates up 200%!"
              </blockquote>
              <p className="text-white/70">Marketing Manager, Retail Brand</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#0A1F44] hover:bg-white/90 font-semibold rounded-full px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                Try the Email Open Rate Calculator
              </Button>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              >
                Start Improving Your Emails Today
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
