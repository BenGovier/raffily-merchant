/**
 * Utility functions for handling payments
 */

// Check if a user has a payment method (simplified for demo)
export const hasPaymentMethod = async (userId: string): Promise<boolean> => {
  // For demo purposes, check localStorage
  if (typeof window !== "undefined") {
    return localStorage.getItem("hasPaymentMethod") === "true"
  }

  // Default to false if server-side
  return false
}

// Add a payment method (simplified for demo)
export const addPaymentMethod = async (userId: string, cardDetails: any): Promise<boolean> => {
  // For demo purposes, store in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("hasPaymentMethod", "true")
    return true
  }

  return false
}

// Remove a payment method (simplified for demo)
export const removePaymentMethod = async (userId: string): Promise<boolean> => {
  // For demo purposes, remove from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("hasPaymentMethod")
    return true
  }

  return false
}
