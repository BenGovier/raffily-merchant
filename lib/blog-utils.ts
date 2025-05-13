// Initialize blog data if it doesn't exist
export function initializeBlogData() {
  if (typeof window === "undefined") return

  // Check if blog posts exist
  if (!localStorage.getItem("blogPosts")) {
    // Sample blog posts
    const samplePosts = [
      {
        id: 1,
        title: "The Future of Customer Engagement in 2025",
        excerpt:
          "The landscape of customer engagement is rapidly evolving, driven by technological advancements and changing consumer expectations.",
        content: `
          <p class="lead">The landscape of customer engagement is rapidly evolving, driven by technological advancements and changing consumer expectations. As we look ahead to 2025, several key trends are emerging that will shape how businesses interact with their customers.</p>
          
          <h2>The Rise of Hyper-Personalization</h2>
          <p>Gone are the days of generic marketing messages. Today's consumers expect brands to understand their individual preferences, behaviors, and needs. By 2025, hyper-personalization will be the norm, not the exception.</p>
          <p>AI-powered analytics will enable businesses to create highly tailored experiences for each customer, from personalized product recommendations to customized communication strategies. This level of personalization will extend beyond digital interactions to in-store experiences, creating a seamless omnichannel journey.</p>
          
          <h2>Interactive Experiences Drive Engagement</h2>
          <p>Static content is giving way to interactive experiences that actively involve customers. Gamification elements, such as raffles, contests, and challenges, are proving to be powerful tools for boosting engagement and building brand loyalty.</p>
          <p>These interactive experiences not only capture attention but also provide valuable data insights. By analyzing participation patterns and preferences, businesses can refine their strategies and create even more compelling experiences.</p>
          
          <h2>The Value Exchange Economy</h2>
          <p>Consumers are increasingly aware of the value of their data and attention. In 2025, successful customer engagement will be built on a clear value exchange – customers willingly sharing information in return for tangible benefits.</p>
          <p>Raffles and promotional campaigns that offer genuine value, whether through prizes, exclusive access, or personalized experiences, will thrive in this environment. Transparency about how customer data is used will be essential for building trust and encouraging participation.</p>
          
          <h2>Conclusion</h2>
          <p>As we move toward 2025, customer engagement will be characterized by deeper personalization, more interactive experiences, and a transparent value exchange. Businesses that embrace these trends and leverage tools like Raffily's platform will be well-positioned to build stronger customer relationships and drive growth.</p>
        `,
        slug: "future-customer-engagement-2025",
        category: "Strategy",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-hero-1-Wd0Aw4Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy",
        date: "2023-11-15",
        readTime: "5 min read",
        author: "Sarah Chen",
        status: "published",
        tags: ["Customer Engagement", "AI", "Personalization", "Marketing Trends"],
        featured: true,
      },
      {
        id: 2,
        title: "How Raffles Can Boost Your Email Open Rates",
        excerpt:
          "Learn how incorporating raffles into your email marketing strategy can significantly increase open rates and engagement.",
        content: `
          <p class="lead">Email marketing remains one of the most effective channels for reaching customers, but declining open rates are a challenge for many businesses. Incorporating raffles into your email strategy can provide the boost you need.</p>
          
          <h2>The Challenge of Email Fatigue</h2>
          <p>With the average professional receiving over 120 emails per day, standing out in a crowded inbox is increasingly difficult. Traditional subject lines and content often fail to capture attention, leading to declining open and engagement rates.</p>
          
          <h2>How Raffles Create Excitement</h2>
          <p>Raffles introduce an element of excitement and anticipation that standard promotional emails lack. The possibility of winning something valuable creates immediate interest and provides a compelling reason to open the email.</p>
          
          <h2>Case Study: Retail Success</h2>
          <p>A mid-sized retail chain implemented a monthly raffle program through their email newsletter. Subscribers were automatically entered into a drawing for store credit. The results were impressive:</p>
          <ul>
            <li>Open rates increased from 18% to 32%</li>
            <li>Click-through rates doubled</li>
            <li>Unsubscribe rates decreased by 25%</li>
          </ul>
          
          <h2>Best Practices for Raffle Emails</h2>
          <p>To maximize the effectiveness of raffle-based email campaigns:</p>
          <ol>
            <li>Use clear, enticing subject lines that mention the prize</li>
            <li>Keep entry mechanisms simple</li>
            <li>Ensure the prize is relevant to your audience</li>
            <li>Create a sense of urgency with limited-time entries</li>
            <li>Follow up with all participants, not just winners</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>Incorporating raffles into your email marketing strategy can provide a significant boost to open rates and overall engagement. By giving subscribers a compelling reason to engage with your content, you can break through inbox fatigue and build stronger customer relationships.</p>
        `,
        slug: "raffles-boost-email-open-rates",
        category: "Marketing",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog-hero-2-Wd0Aw4Hy5Hy5Hy5Hy5Hy5Hy5Hy5Hy",
        date: "2023-11-10",
        readTime: "4 min read",
        author: "Michael Wong",
        status: "published",
        tags: ["Email Marketing", "Open Rates", "Customer Engagement"],
        featured: false,
      },
    ]

    localStorage.setItem("blogPosts", JSON.stringify(samplePosts))
  }

  // Check if blog categories exist
  if (!localStorage.getItem("blogCategories")) {
    const defaultCategories = ["Strategy", "Data Insights", "Compliance", "Marketing", "Case Studies"]
    localStorage.setItem("blogCategories", JSON.stringify(defaultCategories))
  }
}
