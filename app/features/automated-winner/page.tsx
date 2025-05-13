import Image from "next/image"
import { Button } from "@/components/ui/button"
import PageLayout from "@/components/PageLayout"
import { Check, X, Shield, Award, Lock, ChevronDown } from "lucide-react"

export default function AutomatedWinnerPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#1E0B36] to-[#4B1248] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Fully Automated, Fair, & Unbiased Winner Selection
              </h1>
              <p className="text-xl mb-8">
                Raffily's secure, independent draw system guarantees fair winner selection—no human interference, no
                manipulation, just 100% verified randomness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white px-6 py-3 rounded-full">
                  See How It Works
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full">
                  Run a Fair Raffle Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Shield className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span className="text-sm font-medium">Independently Verified</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Lock className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span className="text-sm font-medium">Secure & Tamper-Proof</span>
                </div>
                <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 mr-2 text-[#00B8A9]" />
                  <span className="text-sm font-medium">100% Random Selection</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[300px] md:h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Automated winner selection process visualization"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Raffily's Winner Selection Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">
            How Raffily's Winner Selection Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E0B36] to-[#4B1248] flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold ml-3 text-[#1E0B36]">Randomized Ticket Assignment</h3>
              </div>
              <p className="text-gray-700">
                Every entry is securely logged in our system, ensuring equal chances for all participants.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E0B36] to-[#4B1248] flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold ml-3 text-[#1E0B36]">Independent, Automated Draw</h3>
              </div>
              <p className="text-gray-700">
                Our system runs a tamper-proof random selection process, eliminating bias.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E0B36] to-[#4B1248] flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold ml-3 text-[#1E0B36]">Secure Timestamping</h3>
              </div>
              <p className="text-gray-700">Each draw is time-stamped & stored, so you always have proof of fairness.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E0B36] to-[#4B1248] flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold ml-3 text-[#1E0B36]">Transparent Verification</h3>
              </div>
              <p className="text-gray-700">
                Businesses can choose whether to display the winning ticket number publicly for added trust.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="relative w-full max-w-2xl h-[300px] mx-auto mb-8">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Winner selection process animation"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full">
              Experience Raffily's 100% Fair Draw System—Try a Demo Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">
            How a Business Built Trust with Fair Draws
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">
                  How a UK Retailer Increased Trust with Raffily's Draw System
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-[#1E0B36] mb-2">Challenge:</h4>
                  <p className="text-gray-700">Customers questioned the legitimacy of the brand's giveaway results.</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg text-[#1E0B36] mb-2">Solution:</h4>
                  <p className="text-gray-700">
                    The retailer switched to Raffily's automated draw system, providing proof of fairness with
                    verifiable results.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-[#1E0B36] mb-2">Results:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        50% increase in raffle participation due to higher customer trust.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        More repeat entries as users saw winners transparently displayed.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Improved brand reputation with positive social media feedback.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#00B8A9]">
                  <p className="italic text-gray-700">
                    "Since implementing Raffily's automated draw system, our customers' trust in our promotions has
                    skyrocketed. The transparency has been a game-changer for our brand."
                  </p>
                  <p className="mt-2 font-medium text-[#1E0B36]">— Marketing Director, UK Retail Brand</p>
                </div>
              </div>

              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg text-[#1E0B36] mb-4">Key Improvements</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Participation Rate</span>
                        <span className="text-sm font-medium text-green-500">+50%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Customer Trust</span>
                        <span className="text-sm font-medium text-green-500">+75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Repeat Entries</span>
                        <span className="text-sm font-medium text-green-500">+40%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full">
              Join thousands of brands running fair & transparent raffles—Try Raffily today!
            </Button>
          </div>
        </div>
      </section>

      {/* Verified Fairness & Independent Testing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">
            Verified Fairness & Independent Testing
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-[#1E0B36] mb-4">
                Third-Party Verified for Complete Peace of Mind
              </h3>
              <p className="text-gray-700 mb-6">
                Raffily's random selection algorithm has been independently audited and verified by third-party security
                experts to ensure complete fairness and randomness in every draw.
              </p>
              <p className="text-gray-700 mb-6">
                Each raffle comes with a Fairness Certificate that businesses can download and share with their
                audience—building trust and transparency.
              </p>
              <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white px-6 py-3 rounded-full">
                Download a Sample Fairness Certificate
              </Button>
            </div>

            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-[#1E0B36] mb-6">Raffily vs. Other Platforms</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                    <div className="font-medium">Feature</div>
                    <div className="font-medium text-center">Raffily</div>
                    <div className="font-medium text-center">Manual/Other Platforms</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                    <div>Randomized & Automated Draws</div>
                    <div className="text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </div>
                    <div className="text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                      <span className="text-xs text-gray-500 block mt-1">Risk of human bias</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                    <div>Tamper-Proof & Secure</div>
                    <div className="text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </div>
                    <div className="text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                      <span className="text-xs text-gray-500 block mt-1">No audit trail</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>Independent Verification</div>
                    <div className="text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </div>
                    <div className="text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                      <span className="text-xs text-gray-500 block mt-1">No proof of fairness</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full">
              Want proof of fairness? Download a sample Fairness Certificate
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E0B36] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none">
                <span className="font-semibold text-[#1E0B36]">Can a business influence the winner selection?</span>
                <ChevronDown className="w-5 h-5 text-[#FF4D8D]" />
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-700">
                  No. Our system completely automates the process, ensuring no human interference. The random selection
                  algorithm is sealed and cannot be manipulated by anyone, including Raffily staff.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none">
                <span className="font-semibold text-[#1E0B36]">Can I show proof that my raffle was fair?</span>
                <ChevronDown className="w-5 h-5 text-[#FF4D8D]" />
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-700">
                  Yes! You can choose to display the winning ticket number publicly or download a verification report.
                  This report includes a timestamp, draw ID, and verification code that proves the draw was conducted
                  fairly.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none">
                <span className="font-semibold text-[#1E0B36]">What if a winner is not eligible?</span>
                <ChevronDown className="w-5 h-5 text-[#FF4D8D]" />
              </button>
              <div className="px-6 pb-4">
                <p className="text-gray-700">
                  Businesses can set eligibility rules upfront (e.g., only valid for UK residents). If a winner is
                  ineligible, a new winner is randomly selected using the same fair process, and this is also recorded
                  in the system for transparency.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-4">Still have questions?</p>
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white px-6 py-3 rounded-full">
              Contact our compliance team for details
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1E0B36] to-[#4B1248] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Run 100% Fair, Verified Raffles with Raffily</h2>

          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 mr-2 text-[#00B8A9]" />
              <span className="text-sm font-medium">Verified Fair Draws</span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <Lock className="w-5 h-5 mr-2 text-[#00B8A9]" />
              <span className="text-sm font-medium">Secure & Tamper-Proof</span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 mr-2 text-[#00B8A9]" />
              <span className="text-sm font-medium">Independently Tested</span>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-xl max-w-2xl mx-auto mb-12">
            <p className="italic text-lg mb-4">
              "Since switching to Raffily's automated draws, our customers have full trust in our raffles!"
            </p>
            <div className="flex justify-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white px-8 py-3 rounded-full">
              Try the Fair Draw Demo
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full">
              Start Your Secure Raffle Today
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

