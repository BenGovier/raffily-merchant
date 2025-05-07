import sharp from "sharp"
import path from "path"
import satori from "satori"
import { html } from "satori-html"
import { readFileSync } from "fs"

interface AdGeneratorProps {
  prizeName: string
  brandingData: {
    colors: string[]
    fonts: string[]
    logo?: string
  }
  platform: "instagram" | "facebook" | "twitter"
  dimensions: { width: number; height: number }
}

const TEMPLATES = {
  instagram: {
    width: 1080,
    height: 1080,
    template: (props: AdGeneratorProps) => `
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: ${props.brandingData.colors[0] || "#ffffff"}; padding: 60px; color: #ffffff;">
        <div style="display: flex; align-items: center; margin-bottom: 40px;">
          ${props.brandingData.logo ? `<img src="${props.brandingData.logo}" style="height: 60px; margin-right: 20px;" />` : ""}
          <div style="font-size: 24px; font-weight: bold;">GIVEAWAY</div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <div style="font-size: 72px; font-weight: bold; margin-bottom: 20px;">WIN</div>
          <div style="font-size: 48px; font-weight: bold; margin-bottom: 40px;">${props.prizeName}</div>
          <div style="font-size: 24px;">Enter now for your chance to win!</div>
        </div>
        <div style="font-size: 18px; text-align: center;">
          Powered by Raffily
        </div>
      </div>
    `,
  },
  facebook: {
    width: 1200,
    height: 628,
    template: (props: AdGeneratorProps) => `
      <div style="display: flex; width: 100%; height: 100%; background-color: ${props.brandingData.colors[0] || "#ffffff"}; padding: 40px; color: #ffffff;">
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; align-items: center; margin-bottom: 30px;">
            ${props.brandingData.logo ? `<img src="${props.brandingData.logo}" style="height: 50px; margin-right: 20px;" />` : ""}
            <div style="font-size: 24px; font-weight: bold;">GIVEAWAY</div>
          </div>
          <div style="font-size: 64px; font-weight: bold; margin-bottom: 20px;">WIN</div>
          <div style="font-size: 40px; font-weight: bold; margin-bottom: 30px;">${props.prizeName}</div>
          <div style="font-size: 24px;">Enter now for your chance to win!</div>
        </div>
        <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); font-size: 18px;">
          Powered by Raffily
        </div>
      </div>
    `,
  },
  twitter: {
    width: 1600,
    height: 900,
    template: (props: AdGeneratorProps) => `
      <div style="display: flex; width: 100%; height: 100%; background-color: ${props.brandingData.colors[0] || "#ffffff"}; padding: 60px; color: #ffffff;">
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; align-items: center; margin-bottom: 40px;">
            ${props.brandingData.logo ? `<img src="${props.brandingData.logo}" style="height: 60px; margin-right: 20px;" />` : ""}
            <div style="font-size: 28px; font-weight: bold;">GIVEAWAY</div>
          </div>
          <div style="font-size: 80px; font-weight: bold; margin-bottom: 30px;">WIN</div>
          <div style="font-size: 48px; font-weight: bold; margin-bottom: 40px;">${props.prizeName}</div>
          <div style="font-size: 28px;">Enter now for your chance to win!</div>
        </div>
        <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); font-size: 20px;">
          Powered by Raffily
        </div>
      </div>
    `,
  },
}

export async function generateAd(props: AdGeneratorProps): Promise<Buffer> {
  const template = TEMPLATES[props.platform]
  if (!template) {
    throw new Error(`Unsupported platform: ${props.platform}`)
  }

  // Load Inter font
  const interRegular = readFileSync(path.join(process.cwd(), "public/fonts/Inter-Regular.ttf"))
  const interBold = readFileSync(path.join(process.cwd(), "public/fonts/Inter-Bold.ttf"))

  // Generate SVG using satori
  const svg = await satori(html(template.template(props)), {
    width: template.width,
    height: template.height,
    fonts: [
      {
        name: "Inter",
        data: interRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: interBold,
        weight: 700,
        style: "normal",
      },
    ],
  })

  // Convert SVG to PNG using sharp
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer()

  return buffer
}
