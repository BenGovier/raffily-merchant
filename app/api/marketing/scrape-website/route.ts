import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        {
          error: "URL is required",
          success: false,
        },
        { status: 400 },
      )
    }

    // Fetch the website content
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch website: ${response.statusText}`,
          success: false,
        },
        { status: 500 },
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract colors from inline styles and style tags
    const colors = new Set<string>()
    $("style").each((_, element) => {
      const styleContent = $(element).html() || ""
      const colorMatches = styleContent.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb$$[^)]+$$|rgba$$[^)]+$$/g)
      if (colorMatches) {
        colorMatches.forEach((color) => colors.add(color))
      }
    })

    // Extract colors from inline styles
    $("[style]").each((_, element) => {
      const style = $(element).attr("style") || ""
      const colorMatches = style.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb$$[^)]+$$|rgba$$[^)]+$$/g)
      if (colorMatches) {
        colorMatches.forEach((color) => colors.add(color))
      }
    })

    // Extract fonts
    const fonts = new Set<string>()
    $("style").each((_, element) => {
      const styleContent = $(element).html() || ""
      const fontMatches = styleContent.match(/font-family:\s*([^;]+)/g)
      if (fontMatches) {
        fontMatches.forEach((fontMatch) => {
          const font = fontMatch.replace("font-family:", "").trim()
          fonts.add(font)
        })
      }
    })

    // Extract logo
    let logo = ""
    $("img").each((_, element) => {
      const src = $(element).attr("src") || ""
      const alt = $(element).attr("alt") || ""
      if (src && (src.toLowerCase().includes("logo") || alt.toLowerCase().includes("logo"))) {
        // Make sure the logo URL is absolute
        if (src.startsWith("http")) {
          logo = src
        } else if (src.startsWith("//")) {
          logo = `https:${src}`
        } else if (src.startsWith("/")) {
          const urlObj = new URL(url)
          logo = `${urlObj.origin}${src}`
        } else {
          const urlObj = new URL(url)
          logo = `${urlObj.origin}/${src}`
        }
        return false // break the loop
      }
    })

    // If no logo found with "logo" in src or alt, try to find the first image in the header
    if (!logo) {
      $("header img, .header img, #header img")
        .first()
        .each((_, element) => {
          const src = $(element).attr("src") || ""
          if (src) {
            // Make sure the logo URL is absolute
            if (src.startsWith("http")) {
              logo = src
            } else if (src.startsWith("//")) {
              logo = `https:${src}`
            } else if (src.startsWith("/")) {
              const urlObj = new URL(url)
              logo = `${urlObj.origin}${src}`
            } else {
              const urlObj = new URL(url)
              logo = `${urlObj.origin}/${src}`
            }
          }
        })
    }

    // Extract meta information
    const title = $("title").text() || ""
    const description = $('meta[name="description"]').attr("content") || ""

    // Extract primary color from meta theme-color if available
    const themeColor = $('meta[name="theme-color"]').attr("content")
    if (themeColor) {
      colors.add(themeColor)
    }

    return NextResponse.json({
      colors: Array.from(colors).slice(0, 10), // Limit to 10 colors
      fonts: Array.from(fonts).slice(0, 5), // Limit to 5 fonts
      logo,
      title,
      description,
      success: true,
    })
  } catch (error) {
    console.error("Error scraping website:", error)
    return NextResponse.json(
      {
        error: "Failed to scrape website: " + (error instanceof Error ? error.message : String(error)),
        success: false,
      },
      { status: 500 },
    )
  }
}
