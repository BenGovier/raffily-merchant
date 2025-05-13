import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"
import ResourceSection from "@/components/ResourceSection"

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0A1F44] to-[#1E3A8A]">
      <MainNav />
      <div className="flex-grow">
        <header className="py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Raffily Resources</h1>
            <p className="text-xl text-white/80">
              Download professionally designed templates and assets to supercharge your raffle campaigns
            </p>
          </div>
        </header>

        <ResourceSection
          id="email-templates"
          title="Email Templates"
          description="HTML email templates to promote your raffles and engage participants"
          resources={[
            { name: "Raffle Announcement", format: "HTML", size: "3 KB", filename: "raffle-announcement.html" },
            { name: "Winner Notification", format: "HTML", size: "3 KB", filename: "winner-notification.html" },
            { name: "Last Chance Reminder", format: "HTML", size: "3 KB", filename: "last-chance-reminder.html" },
          ]}
        />

        <ResourceSection
          id="social-media-adverts"
          title="Social Media Adverts"
          description="Eye-catching social media ad templates for various platforms"
          resources={[
            { name: "Facebook Ad Set", format: "PSD", size: "5 MB", filename: "facebook-ad-set.psd" },
            { name: "Instagram Story Templates", format: "AI", size: "4 MB", filename: "instagram-story-templates.ai" },
            { name: "Twitter Header Pack", format: "ZIP", size: "2 MB", filename: "twitter-header-pack.zip" },
          ]}
        />

        <ResourceSection
          id="animated-banners"
          title="Animated Banners"
          description="Engaging animated banners to promote your raffles on websites and ad networks"
          resources={[
            { name: "Leaderboard (728x90)", format: "GIF", size: "10 KB", filename: "leaderboard-728x90.gif" },
            {
              name: "Medium Rectangle (300x250)",
              format: "GIF",
              size: "15 KB",
              filename: "medium-rectangle-300x250.gif",
            },
            {
              name: "Wide Skyscraper (160x600)",
              format: "GIF",
              size: "12 KB",
              filename: "wide-skyscraper-160x600.gif",
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  )
}

