import type { UserCredits, CreditTransaction } from "@/types/credits"
import { calculateCreditsNeeded } from "./stripe-config"

// In a real application, this would interact with a database
// For this demo, we'll use localStorage on the client side

// Mock database for credits (in a real app, this would be in a database)
const mockUserCredits: Record<string, UserCredits> = {}
const mockTransactions: CreditTransaction[] = []

// Get user credits
export const getUserCredits = async (userId: string): Promise<UserCredits> => {
  // In a real app, this would fetch from a database
  if (typeof window !== "undefined") {
    const storedCredits = localStorage.getItem(`user_credits_${userId}`)
    if (storedCredits) {
      return JSON.parse(storedCredits)
    }
  }

  // If no credits found, create a new record
  const newCredits: UserCredits = {
    userId,
    balance: 0,
    totalPurchased: 0,
    totalUsed: 0,
    lastUpdated: new Date(),
  }

  // Store in mock database
  mockUserCredits[userId] = newCredits

  // In a real app, this would save to a database
  if (typeof window !== "undefined") {
    localStorage.setItem(`user_credits_${userId}`, JSON.stringify(newCredits))
  }

  return newCredits
}

// Add credits to user account
export const addCredits = async (
  userId: string,
  amount: number,
  type: "purchase" | "refund" | "bonus" = "purchase",
  description = "Credit purchase",
  metadata?: Record<string, any>,
): Promise<UserCredits> => {
  // Get current credits
  const currentCredits = await getUserCredits(userId)

  // Update credits
  const updatedCredits: UserCredits = {
    ...currentCredits,
    balance: currentCredits.balance + amount,
    totalPurchased: type === "purchase" ? currentCredits.totalPurchased + amount : currentCredits.totalPurchased,
    lastUpdated: new Date(),
  }

  // Create transaction record
  const transaction: CreditTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    amount,
    type,
    description,
    metadata,
    createdAt: new Date(),
  }

  // Store in mock database
  mockUserCredits[userId] = updatedCredits
  mockTransactions.push(transaction)

  // In a real app, this would save to a database
  if (typeof window !== "undefined") {
    localStorage.setItem(`user_credits_${userId}`, JSON.stringify(updatedCredits))

    // Store transaction
    const transactions = JSON.parse(localStorage.getItem(`user_transactions_${userId}`) || "[]")
    transactions.push(transaction)
    localStorage.setItem(`user_transactions_${userId}`, JSON.stringify(transactions))
  }

  return updatedCredits
}

// Use credits for sending SMS
export const useCredits = async (
  userId: string,
  smsCount: number,
  description = "SMS sending",
): Promise<{ success: boolean; message: string; remainingCredits: number }> => {
  // Calculate credits needed
  const creditsNeeded = calculateCreditsNeeded(smsCount)

  // Get current credits
  const currentCredits = await getUserCredits(userId)

  // Check if user has enough credits
  if (currentCredits.balance < creditsNeeded) {
    return {
      success: false,
      message: `Insufficient credits. Need ${creditsNeeded} credits, but only have ${currentCredits.balance}.`,
      remainingCredits: currentCredits.balance,
    }
  }

  // Update credits
  const updatedCredits: UserCredits = {
    ...currentCredits,
    balance: currentCredits.balance - creditsNeeded,
    totalUsed: currentCredits.totalUsed + creditsNeeded,
    lastUpdated: new Date(),
  }

  // Create transaction record
  const transaction: CreditTransaction = {
    id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    amount: -creditsNeeded,
    type: "usage",
    description,
    metadata: { smsCount },
    createdAt: new Date(),
  }

  // Store in mock database
  mockUserCredits[userId] = updatedCredits
  mockTransactions.push(transaction)

  // In a real app, this would save to a database
  if (typeof window !== "undefined") {
    localStorage.setItem(`user_credits_${userId}`, JSON.stringify(updatedCredits))

    // Store transaction
    const transactions = JSON.parse(localStorage.getItem(`user_transactions_${userId}`) || "[]")
    transactions.push(transaction)
    localStorage.setItem(`user_transactions_${userId}`, JSON.stringify(transactions))
  }

  return {
    success: true,
    message: `Successfully used ${creditsNeeded} credits for sending ${smsCount} SMS messages.`,
    remainingCredits: updatedCredits.balance,
  }
}

// Get user transactions
export const getUserTransactions = async (userId: string): Promise<CreditTransaction[]> => {
  // In a real app, this would fetch from a database
  if (typeof window !== "undefined") {
    const storedTransactions = localStorage.getItem(`user_transactions_${userId}`)
    if (storedTransactions) {
      return JSON.parse(storedTransactions)
    }
  }

  return []
}

