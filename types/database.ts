export interface Merchant {
  _id?: string
  email: string
  name: string
  company: string
  companyLogo?: string
  billingEmail?: string
  createdAt: Date
  password: string // In a real app, this would be hashed
}

export interface Raffle {
  _id?: string
  merchantId: string
  title: string
  description: string
  prize: string
  startDate: Date
  endDate: Date
  status: "draft" | "active" | "completed" | "cancelled"
  entries?: Entry[]
  winners?: Winner[]
  createdAt: Date
  updatedAt: Date
}

export interface Entry {
  _id?: string
  raffleId: string
  email: string
  name: string
  entryDate: Date
  referralCode?: string
  referredBy?: string
}

export interface Winner {
  _id?: string
  raffleId: string
  entryId: string
  email: string
  name: string
  prize: string
  notified: boolean
  notificationDate?: Date
  claimed: boolean
  claimDate?: Date
}

