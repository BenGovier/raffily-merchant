import { type NextRequest, NextResponse } from "next/server"

// This middleware checks if a user has a payment method
// In development, it always returns true to bypass payment checks
export function paymentRequiredMiddleware(req: NextRequest) {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === "development"

  // In development, bypass payment checks
  if (isDevelopment) {
    return NextResponse.next()
  }

  // In production, we would check for payment methods
  // For now, just proceed
  return NextResponse.next()
}
