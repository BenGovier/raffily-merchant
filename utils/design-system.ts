// Design System Utilities

// Color manipulation functions
export function darken(color: string, amount: number): string {
  return adjustColor(color, -amount)
}

export function lighten(color: string, amount: number): string {
  return adjustColor(color, amount)
}

function adjustColor(color: string, amount: number): string {
  // Convert hex to RGB
  let r, g, b

  if (color.startsWith("#")) {
    const hex = color.substring(1)
    r = Number.parseInt(hex.substring(0, 2), 16)
    g = Number.parseInt(hex.substring(2, 4), 16)
    b = Number.parseInt(hex.substring(4, 6), 16)
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g)
    if (match && match.length >= 3) {
      r = Number.parseInt(match[0])
      g = Number.parseInt(match[1])
      b = Number.parseInt(match[2])
    } else {
      return color
    }
  } else {
    return color
  }

  // Adjust color
  r = Math.max(0, Math.min(255, r + amount * 255))
  g = Math.max(0, Math.min(255, g + amount * 255))
  b = Math.max(0, Math.min(255, b + amount * 255))

  // Convert back to hex
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`
}

// Contrast checker
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

export function getLuminance(color: string): number {
  // Convert hex to RGB
  let r, g, b

  if (color.startsWith("#")) {
    const hex = color.substring(1)
    r = Number.parseInt(hex.substring(0, 2), 16) / 255
    g = Number.parseInt(hex.substring(2, 4), 16) / 255
    b = Number.parseInt(hex.substring(4, 6), 16) / 255
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g)
    if (match && match.length >= 3) {
      r = Number.parseInt(match[0]) / 255
      g = Number.parseInt(match[1]) / 255
      b = Number.parseInt(match[2]) / 255
    } else {
      return 0
    }
  } else {
    return 0
  }

  // Adjust for gamma
  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

  // Calculate luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Font pairing system
export interface FontPair {
  heading: string
  body: string
}

export const fontPairs: Record<string, FontPair> = {
  modern: {
    heading: "Montserrat, sans-serif",
    body: "Open Sans, sans-serif",
  },
  classic: {
    heading: "Playfair Display, serif",
    body: "Source Sans Pro, sans-serif",
  },
  minimal: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
  },
  elegant: {
    heading: "Cormorant Garamond, serif",
    body: "Nunito, sans-serif",
  },
  tech: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
  vibrant: {
    heading: "Raleway, sans-serif",
    body: "Nunito, sans-serif",
  },
  bold: {
    heading: "Anton, sans-serif",
    body: "Roboto, sans-serif",
  },
  playful: {
    heading: "Fredoka One, cursive",
    body: "Quicksand, sans-serif",
  },
}

// Get the best font pair based on website style
export function getBestFontPair(websiteFonts: string[]): FontPair {
  // Default to vibrant if no fonts are found
  if (!websiteFonts || websiteFonts.length === 0) {
    return fontPairs.vibrant
  }

  // Check if any of the website fonts match our known pairs
  const lowerFonts = websiteFonts.map((f) => f.toLowerCase())

  if (lowerFonts.some((f) => f.includes("playfair") || f.includes("serif"))) {
    return fontPairs.classic
  }

  if (lowerFonts.some((f) => f.includes("roboto") || f.includes("arial"))) {
    return fontPairs.bold
  }

  if (lowerFonts.some((f) => f.includes("garamond") || f.includes("times"))) {
    return fontPairs.elegant
  }

  if (lowerFonts.some((f) => f.includes("poppins") || f.includes("inter"))) {
    return fontPairs.tech
  }

  // Default to vibrant
  return fontPairs.vibrant
}

// Design templates
export interface DesignTemplate {
  id: string
  name: string
  description: string
  style: {
    layout: "centered" | "split" | "asymmetric" | "minimal" | "bold" | "celebratory" | "energetic"
    elements: {
      logo: { size: "small" | "medium" | "large"; position: "top" | "bottom" | "corner" }
      heading: { size: "small" | "medium" | "large" | "xlarge"; weight: "normal" | "bold" | "black" }
      cta: { style: "button" | "text" | "underlined" | "vibrant"; size: "small" | "medium" | "large" }
    }
    spacing: "compact" | "balanced" | "airy"
    effects: {
      confetti: boolean
      sparkles: boolean
      starburst: boolean
      gradient: boolean
      pattern: boolean
    }
  }
}

export const designTemplates: DesignTemplate[] = [
  {
    id: "celebratory",
    name: "Celebratory",
    description: "Exciting design with confetti and vibrant elements",
    style: {
      layout: "celebratory",
      elements: {
        logo: { size: "medium", position: "top" },
        heading: { size: "xlarge", weight: "black" },
        cta: { style: "vibrant", size: "large" },
      },
      spacing: "balanced",
      effects: {
        confetti: true,
        sparkles: true,
        starburst: false,
        gradient: true,
        pattern: false,
      },
    },
  },
  {
    id: "energetic",
    name: "Energetic",
    description: "Dynamic design with starburst effects and bold typography",
    style: {
      layout: "energetic",
      elements: {
        logo: { size: "medium", position: "corner" },
        heading: { size: "xlarge", weight: "black" },
        cta: { style: "vibrant", size: "large" },
      },
      spacing: "compact",
      effects: {
        confetti: false,
        sparkles: true,
        starburst: true,
        gradient: true,
        pattern: false,
      },
    },
  },
  {
    id: "bold",
    name: "Bold",
    description: "High-impact design with strong visuals",
    style: {
      layout: "bold",
      elements: {
        logo: { size: "medium", position: "corner" },
        heading: { size: "large", weight: "black" },
        cta: { style: "vibrant", size: "large" },
      },
      spacing: "compact",
      effects: {
        confetti: false,
        sparkles: false,
        starburst: false,
        gradient: true,
        pattern: true,
      },
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, simple design with plenty of whitespace",
    style: {
      layout: "minimal",
      elements: {
        logo: { size: "small", position: "top" },
        heading: { size: "large", weight: "bold" },
        cta: { style: "text", size: "medium" },
      },
      spacing: "airy",
      effects: {
        confetti: false,
        sparkles: false,
        starburst: false,
        gradient: false,
        pattern: false,
      },
    },
  },
  {
    id: "split",
    name: "Split",
    description: "Two-column layout with balanced elements",
    style: {
      layout: "split",
      elements: {
        logo: { size: "large", position: "top" },
        heading: { size: "medium", weight: "bold" },
        cta: { style: "button", size: "medium" },
      },
      spacing: "balanced",
      effects: {
        confetti: false,
        sparkles: false,
        starburst: false,
        gradient: true,
        pattern: false,
      },
    },
  },
]

// Get the best template based on brand colors and style
export function getBestTemplate(brandingData: any): DesignTemplate {
  // Default to celebratory
  if (!brandingData) {
    return designTemplates[0]
  }

  // If the brand has vibrant colors, use energetic template
  if (brandingData.colors && brandingData.colors.length > 0) {
    const primaryColor = brandingData.colors[0]
    const luminance = getLuminance(primaryColor)

    if (luminance < 0.2) {
      // Dark colors - use bold
      return designTemplates.find((t) => t.id === "bold") || designTemplates[0]
    } else if (luminance > 0.8) {
      // Light colors - use energetic
      return designTemplates.find((t) => t.id === "energetic") || designTemplates[0]
    } else {
      // Medium colors - use celebratory
      return designTemplates.find((t) => t.id === "celebratory") || designTemplates[0]
    }
  }

  return designTemplates[0]
}

// Generate confetti SVG
export function generateConfettiSVG(colors: string[]): string {
  const confettiColors =
    colors.length >= 3
      ? colors
      : [...colors, ...["#FFD700", "#FF6B6B", "#4ECDC4", "#FF8C42"].slice(0, 3 - colors.length)]

  let confetti = ""
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 10 + 5
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
    const rotation = Math.random() * 360

    if (i % 3 === 0) {
      // Rectangle
      confetti += `<rect x="${x}%" y="${y}%" width="${size}" height="${size / 2}" fill="${color}" transform="rotate(${rotation}, ${x}%, ${y}%)" opacity="${Math.random() * 0.5 + 0.5}" />`
    } else if (i % 3 === 1) {
      // Circle
      confetti += `<circle cx="${x}%" cy="${y}%" r="${size / 2}" fill="${color}" opacity="${Math.random() * 0.5 + 0.5}" />`
    } else {
      // Triangle
      const x1 = x
      const y1 = y
      const x2 = x + size
      const y2 = y
      const x3 = x + size / 2
      const y3 = y + size
      confetti += `<polygon points="${x1}%,${y1}% ${x2}%,${y2}% ${x3}%,${y3}%" fill="${color}" transform="rotate(${rotation}, ${x}%, ${y}%)" opacity="${Math.random() * 0.5 + 0.5}" />`
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">${confetti}</svg>`
}

// Generate sparkles SVG
export function generateSparklesSVG(color: string): string {
  let sparkles = ""
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 5 + 2
    const opacity = Math.random() * 0.5 + 0.5

    sparkles += `
      <path d="M${x} ${y - size}L${x} ${y + size}M${x - size} ${y}L${x + size} ${y}" 
            stroke="${color}" 
            stroke-width="2" 
            opacity="${opacity}" />
    `
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">${sparkles}</svg>`
}

// Generate starburst SVG
export function generateStarburstSVG(color: string): string {
  const cx = 50
  const cy = 50
  const outerRadius = 50
  const innerRadius = 20
  const points = 12

  let path = ""
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (Math.PI * 2 * i) / (points * 2)
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)

    if (i === 0) {
      path += `M${x},${y}`
    } else {
      path += `L${x},${y}`
    }
  }
  path += "Z"

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path d="${path}" fill="${color}" opacity="0.3" />
  </svg>`
}

// Generate geometric pattern SVG
export function generatePatternSVG(color: string): string {
  const patternSize = 10
  const patternOpacity = 0.2

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${patternSize} ${patternSize}" preserveAspectRatio="none">
    <defs>
      <pattern id="pattern" patternUnits="userSpaceOnUse" width="${patternSize}" height="${patternSize}">
        <circle cx="${patternSize / 2}" cy="${patternSize / 2}" r="1" fill="${color}" opacity="${patternOpacity}" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern)" />
  </svg>`
}

// A/B Testing framework
export interface ABTest {
  id: string
  variants: {
    id: string
    name: string
    weight: number // 0-1, sum of all weights should be 1
  }[]
  getVariant: () => string
}

export function createABTest(id: string, variants: { id: string; name: string; weight: number }[]): ABTest {
  return {
    id,
    variants,
    getVariant: () => {
      const random = Math.random()
      let cumulativeWeight = 0

      for (const variant of variants) {
        cumulativeWeight += variant.weight
        if (random <= cumulativeWeight) {
          return variant.id
        }
      }

      return variants[0].id
    },
  }
}

// Example A/B test for CTA style
export const ctaStyleTest = createABTest("cta_style", [
  { id: "vibrant", name: "Vibrant", weight: 0.5 },
  { id: "button", name: "Button", weight: 0.25 },
  { id: "text", name: "Text", weight: 0.25 },
])

// Example A/B test for layout
export const layoutTest = createABTest("layout", [
  { id: "celebratory", name: "Celebratory", weight: 0.4 },
  { id: "energetic", name: "Energetic", weight: 0.3 },
  { id: "bold", name: "Bold", weight: 0.3 },
])

