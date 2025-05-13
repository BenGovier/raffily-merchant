// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ""
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ""
export const STRIPE_API_VERSION = "2023-10-16"

// Validate configuration
if (!STRIPE_PUBLISHABLE_KEY) {
  console.warn("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable")
}

if (!STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable")
}

if (!STRIPE_WEBHOOK_SECRET) {
  console.warn("Missing STRIPE_WEBHOOK_SECRET environment variable")
}

// Export configuration object
export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  secretKey: STRIPE_SECRET_KEY,
  webhookSecret: STRIPE_WEBHOOK_SECRET,
  apiVersion: STRIPE_API_VERSION,
}

// Credit packages configuration
import type { CreditPackage } from "@/types/credits"

// Base SMS pricing in pence per message from provider
const BASE_SMS_PRICING = {
  TIER_1: 3.2, // Under 5k messages: 3.20p per SMS
  TIER_2: 3.03, // 5k or more: 3.03p per SMS
  TIER_3: 2.84, // 50k or more: 2.84p per SMS
  TIER_4: 2.57, // 150k or more: 2.57p per SMS
}

// Markup percentage (15%)
const MARKUP_PERCENTAGE = 15

// Calculate final SMS pricing with markup
const SMS_PRICING = {
  TIER_1: Number.parseFloat((BASE_SMS_PRICING.TIER_1 * (1 + MARKUP_PERCENTAGE / 100)).toFixed(2)), // 3.68p
  TIER_2: Number.parseFloat((BASE_SMS_PRICING.TIER_2 * (1 + MARKUP_PERCENTAGE / 100)).toFixed(2)), // 3.48p
  TIER_3: Number.parseFloat((BASE_SMS_PRICING.TIER_3 * (1 + MARKUP_PERCENTAGE / 100)).toFixed(2)), // 3.27p
  TIER_4: Number.parseFloat((BASE_SMS_PRICING.TIER_4 * (1 + MARKUP_PERCENTAGE / 100)).toFixed(2)), // 2.96p
}

// Convert pence to pounds for display
const penceToGBP = (pence: number): number => {
  return Number.parseFloat((pence / 100).toFixed(2))
}

// Calculate price based on quantity and appropriate tier with markup
const calculatePrice = (quantity: number): number => {
  if (quantity < 5000) {
    return quantity * SMS_PRICING.TIER_1
  } else if (quantity < 50000) {
    return quantity * SMS_PRICING.TIER_2
  } else if (quantity < 150000) {
    return quantity * SMS_PRICING.TIER_3
  } else {
    return quantity * SMS_PRICING.TIER_4
  }
}

export const SMS_CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 500,
    price: penceToGBP(calculatePrice(500)),
    description: "Perfect for small campaigns",
    pricePerSMS: SMS_PRICING.TIER_1,
    basePricePerSMS: BASE_SMS_PRICING.TIER_1,
  },
  {
    id: "basic",
    name: "Basic",
    credits: 2000,
    price: penceToGBP(calculatePrice(2000)),
    description: "Good for regular campaigns",
    pricePerSMS: SMS_PRICING.TIER_1,
    basePricePerSMS: BASE_SMS_PRICING.TIER_1,
  },
  {
    id: "standard",
    name: "Standard",
    credits: 5000,
    price: penceToGBP(calculatePrice(5000)),
    description: "Most popular for businesses",
    popular: true,
    pricePerSMS: SMS_PRICING.TIER_2,
    basePricePerSMS: BASE_SMS_PRICING.TIER_2,
  },
  {
    id: "premium",
    name: "Premium",
    credits: 50000,
    price: penceToGBP(calculatePrice(50000)),
    description: "Best value for high-volume senders",
    pricePerSMS: SMS_PRICING.TIER_3,
    basePricePerSMS: BASE_SMS_PRICING.TIER_3,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    credits: 150000,
    price: penceToGBP(calculatePrice(150000)),
    description: "For businesses with extensive SMS needs",
    pricePerSMS: SMS_PRICING.TIER_4,
    basePricePerSMS: BASE_SMS_PRICING.TIER_4,
  },
]

// Credit cost per SMS (1 credit = 1 SMS)
export const CREDIT_COST_PER_SMS = 1

// Calculate how many SMS can be sent with a given credit amount
export const calculateSMSCount = (credits: number): number => {
  return Math.floor(credits / CREDIT_COST_PER_SMS)
}

// Calculate credits needed for a given number of SMS
export const calculateCreditsNeeded = (smsCount: number): number => {
  return smsCount * CREDIT_COST_PER_SMS
}

// Get the price per SMS based on quantity
export const getPricePerSMS = (quantity: number): number => {
  if (quantity < 5000) {
    return SMS_PRICING.TIER_1
  } else if (quantity < 50000) {
    return SMS_PRICING.TIER_2
  } else if (quantity < 150000) {
    return SMS_PRICING.TIER_3
  } else {
    return SMS_PRICING.TIER_4
  }
}

// Get the base price per SMS (without markup) based on quantity
export const getBasePricePerSMS = (quantity: number): number => {
  if (quantity < 5000) {
    return BASE_SMS_PRICING.TIER_1
  } else if (quantity < 50000) {
    return BASE_SMS_PRICING.TIER_2
  } else if (quantity < 150000) {
    return BASE_SMS_PRICING.TIER_3
  } else {
    return BASE_SMS_PRICING.TIER_4
  }
}

// Export the markup percentage as a number
export const MARKUP_PERCENTAGE_VALUE = MARKUP_PERCENTAGE

// Billing rates
export const TICKET_RATE = 25 // 25p per ticket
export const QUESTION_RATE = 25 // 25p per question
export const BILLING_THRESHOLD = 25000 // £250 in pence

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount / 100)
}

// Convert pence to pounds
export const penceToPounds = (pence: number): number => {
  return Number((pence / 100).toFixed(2))
}

// Convert pounds to pence
export const poundsToPence = (pounds: number): number => {
  return Math.round(pounds * 100)
}
