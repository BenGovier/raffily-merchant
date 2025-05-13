"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FinalCTA } from "@/components/FinalCTA"
import { Check, Share2, Users, Award, BarChart3, Facebook, Twitter, Instagram, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export default function SocialSharingPage() {
  return (
    <main className="bg-[#0A1F44] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Turn Your Raffle into a Viral Social Media Sensation
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Leverage social sharing incentives to get more likes, followers, and engagement—without spending on ads.
                Raffily makes raffles go viral with built-in referral rewards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/request-demo">
                  <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 text-white px-6 py-3 h-auto rounded-full">
                    Boost Your Social Growth Today
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-white text-[#0A1F44] hover:bg-white/10 px-6 py-3 h-auto rounded-full"
                >
                  See Viral Raffles in Action
                </Button>
              </div>
              <div className="bg-white/10 rounded-lg p-4 inline-flex items-center">
                <span className="text-accent font-bold text-xl mr-2">500,000+</span>
                <span className="text-white/80">Raffily-powered raffles have been shared across social media</span>
              </div>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%201-d3A3HLula2lWjVDbIwHCwJmFTOY2go.png"
                    alt="Social media engagement visualization"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Raffily's Social Sharing Works */}
      <section className="py-20 bg-[#0F2A56]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Raffily's Social Sharing Works</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-8">
                {[
                  {
                    icon: <Share2 className="h-8 w-8 text-accent" />,
                    title: "Easy Social Sharing",
                    description:
                      "Every entrant is prompted to share the raffle on social media for extra entries, expanding your reach organically.",
                  },
                  {
                    icon: <Users className="h-8 w-8 text-accent" />,
                    title: "Referral Incentives",
                    description:
                      "Users get more chances to win when friends enter using their link, creating a viral loop of engagement.",
                  },
                  {
                    icon: <Award className="h-8 w-8 text-accent" />,
                    title: "Automated Leaderboards",
                    description:
                      "Top referrers earn bonus prizes, fueling more shares and creating friendly competition.",
                  },
                  {
                    icon: <BarChart3 className="h-8 w-8 text-accent" />,
                    title: "Track Engagement & ROI",
                    description:
                      "Businesses can see real-time social shares & new followers gained through detailed analytics.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] bg-white/5 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/social%202-Xn8Mk5yoGak2uk8KVhARPTof91AiCn.png"
                    alt="Social sharing flow inside Raffily"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/request-demo">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-auto text-lg rounded-full">
                Want to see your brand go viral? Start a free raffle today!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Success Story</h2>
          <p className="text-xl text-center text-white/80 mb-16 max-w-3xl mx-auto">
            See how real businesses are using Raffily to grow their social media presence and engagement
          </p>

          <div className="bg-gradient-to-r from-[#0F2A56] to-[#1A3A6C] rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-white/10 rounded-xl p-6 h-full">
                  <h3 className="text-2xl font-bold mb-4">How a Fitness Brand Gained 15,000 Followers with Raffily</h3>
                  <div className="space-y-6 mt-8">
                    <div>
                      <h4 className="text-accent font-semibold mb-2">Challenge:</h4>
                      <p className="text-white/80">
                        The brand struggled to grow on Instagram & Facebook without spending heavily on ads.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-accent font-semibold mb-2">Solution:</h4>
                      <p className="text-white/80">
                        Used Raffily's social sharing system to incentivize shares and referrals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h4 className="text-xl font-semibold mb-6">Results:</h4>
                <div className="space-y-6">
                  {[
                    { metric: "15,000", label: "New followers in 30 days", percentage: "100%" },
                    { metric: "3x", label: "Increase in post engagement", percentage: "75%" },
                    { metric: "40%", label: "Higher sales from engaged users", percentage: "40%" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-accent">{item.metric}</span>
                          <span className="text-white/80">{item.label}</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{ width: item.percentage }}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-white/5 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-accent text-4xl">"</div>
                    <div>
                      <p className="italic text-white/90 mb-4">
                        Raffily transformed our social media strategy. We went from struggling to grow our following to
                        seeing thousands of new followers every week. The referral system created a snowball effect we
                        couldn't have achieved with paid ads alone.
                      </p>
                      <p className="font-semibold">Sarah J., Marketing Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/request-demo">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-auto text-lg rounded-full">
                Want the same results? Launch your viral campaign today!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Built-in Social Media Tools */}
      <section className="py-20 bg-[#0F2A56]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Social Sharing Features That Make Your Raffles Go Viral
          </h2>
          <p className="text-xl text-center text-white/80 mb-16 max-w-3xl mx-auto">
            Raffily comes packed with powerful tools designed to maximize social sharing and engagement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <div className="flex gap-2">
                    <Facebook className="h-6 w-6" />
                    <Twitter className="h-6 w-6" />
                    <Instagram className="h-6 w-6" />
                  </div>
                ),
                title: "1-Click Social Sharing",
                description: "Users can instantly share raffles on Facebook, Twitter, Instagram, WhatsApp & more.",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Referral Link Generator",
                description: "Every entrant gets a unique referral link to invite friends for extra entries.",
              },
              {
                icon: <Smartphone className="h-6 w-6" />,
                title: "Automated Social Reminders",
                description: "Raffily sends timed social media reminders to keep raffles trending.",
              },
              {
                icon: <Share2 className="h-6 w-6" />,
                title: "Hashtag Contests",
                description: "Brands can require users to post with a hashtag to enter, driving organic reach.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-all hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent/20 to-accent/40 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/request-demo">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-auto text-lg rounded-full">
                Use Raffily's built-in social tools to grow your brand—Start a free raffle now!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Best Practices */}
      <section className="py-20 bg-[#0A1F44]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Social Media Best Practices</h2>
          <p className="text-xl text-center text-white/80 mb-16 max-w-3xl mx-auto">
            Follow these expert tips to maximize the viral potential of your Raffily campaigns
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Use a Highly Shareable Prize",
                description:
                  "The better the prize, the more people share. Experiences, cash, and trending items work best.",
                tips: [
                  "Choose prizes with broad appeal",
                  "Consider seasonal or trending items",
                  "Highlight the prize value prominently",
                ],
              },
              {
                number: "02",
                title: "Optimize for Each Social Platform",
                description: "Each platform has unique features to maximize sharing and engagement.",
                tips: [
                  "On Instagram → Ask users to tag 3 friends",
                  "On Twitter → Require retweets for extra entries",
                  "On Facebook → Encourage comments and shares",
                ],
              },
              {
                number: "03",
                title: "Announce the Winner Publicly",
                description: "Posting the winner's reaction makes future raffles even bigger!",
                tips: [
                  "Share winner announcements on all platforms",
                  "Include photos or videos of winners (with permission)",
                  "Tease your next raffle in winner announcements",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-xl p-8 border border-white/10"
              >
                <div className="text-4xl font-bold text-accent/50 mb-4">{item.number}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/80 mb-6">{item.description}</p>
                <ul className="space-y-3">
                  {item.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/request-demo">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-auto text-lg rounded-full">
                Follow these tips and watch your brand go viral—Start your first raffle today!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0F2A56] to-[#1A3A6C]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Turn Your Social Media Into an Engagement Powerhouse</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join hundreds of brands that have transformed their social media presence with Raffily's viral raffle tools
          </p>

          <div className="bg-white/5 rounded-lg p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-start gap-4">
              <div className="text-accent text-4xl">"</div>
              <div className="text-left">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="italic text-white/90 mb-4">
                  We ran a Raffily-powered raffle and gained 10,000 new Instagram followers in just a few weeks! The ROI
                  compared to paid ads was incredible.
                </p>
                <p className="font-semibold">Michael T., E-commerce Brand Owner</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-demo">
              <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 h-auto text-lg rounded-full">
                Launch a Viral Raffle Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-[#0A1F44] hover:bg-white/10 px-8 py-4 h-auto text-lg rounded-full"
            >
              See How Raffily Boosts Social Growth
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
