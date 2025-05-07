export interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  description: string
  popular?: boolean
}

export interface UserCredits {
  userId: string
  balance: number
  totalPurchased: number
  totalUsed: number
  lastUpdated: Date
}

export interface CreditTransaction {
  id: string
  userId: string
  amount: number
  type: "purchase" | "usage" | "refund" | "bonus"
  description: string
  metadata?: Record<string, any>
  createdAt: Date
}
