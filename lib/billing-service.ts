import Stripe from "stripe"
import { connectToDatabase } from "./mongodb"
import { UserModel } from "@/models/user"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

class BillingService {
  /**
   * Check if a user has a valid payment method
   */
  static async hasValidPaymentMethod(userId: string): Promise<boolean> {
    try {
      // For demo accounts, always return true
      if (userId.includes("demo")) {
        return true
      }

      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user has a Stripe customer ID, check for payment methods
      if (user.stripeCustomerId) {
        const paymentMethods = await stripe.paymentMethods.list({
          customer: user.stripeCustomerId,
          type: "card",
        })

        return paymentMethods.data.length > 0
      }

      return false
    } catch (error) {
      console.error("Error checking payment method:", error)
      // Default to false if there's an error
      return false
    }
  }

  /**
   * Create a Stripe customer for a user
   */
  static async createStripeCustomer(userId: string, email: string, name?: string): Promise<string> {
    try {
      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user already has a Stripe customer ID, return it
      if (user.stripeCustomerId) {
        return user.stripeCustomerId
      }

      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
        },
      })

      // Update the user with the Stripe customer ID
      user.stripeCustomerId = customer.id
      await user.save()

      return customer.id
    } catch (error) {
      console.error("Error creating Stripe customer:", error)
      throw error
    }
  }

  /**
   * Create a setup intent for adding a payment method
   */
  static async createSetupIntent(userId: string): Promise<{ clientSecret: string }> {
    try {
      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user doesn't have a Stripe customer ID, create one
      if (!user.stripeCustomerId) {
        const customerId = await BillingService.createStripeCustomer(userId, user.email, user.name)
        user.stripeCustomerId = customerId
        await user.save()
      }

      // Create a setup intent
      const setupIntent = await stripe.setupIntents.create({
        customer: user.stripeCustomerId,
        payment_method_types: ["card"],
      })

      return { clientSecret: setupIntent.client_secret! }
    } catch (error) {
      console.error("Error creating setup intent:", error)
      throw error
    }
  }

  /**
   * Get a user's payment methods
   */
  static async getPaymentMethods(userId: string) {
    try {
      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user doesn't have a Stripe customer ID, they have no payment methods
      if (!user.stripeCustomerId) {
        return []
      }

      // Get the user's payment methods
      const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
        type: "card",
      })

      return paymentMethods.data.map((pm) => ({
        id: pm.id,
        brand: pm.card?.brand,
        last4: pm.card?.last4,
        expMonth: pm.card?.exp_month,
        expYear: pm.card?.exp_year,
        isDefault: pm.id === user.defaultPaymentMethodId,
      }))
    } catch (error) {
      console.error("Error getting payment methods:", error)
      throw error
    }
  }

  /**
   * Set a payment method as default
   */
  static async setDefaultPaymentMethod(userId: string, paymentMethodId: string) {
    try {
      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user doesn't have a Stripe customer ID, they have no payment methods
      if (!user.stripeCustomerId) {
        throw new Error("User has no payment methods")
      }

      // Update the customer's default payment method
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })

      // Update the user's default payment method
      user.defaultPaymentMethodId = paymentMethodId
      await user.save()

      return { success: true }
    } catch (error) {
      console.error("Error setting default payment method:", error)
      throw error
    }
  }

  /**
   * Delete a payment method
   */
  static async deletePaymentMethod(userId: string, paymentMethodId: string) {
    try {
      // Connect to the database
      await connectToDatabase()

      // Find the user
      const user = await UserModel.findById(userId)
      if (!user) {
        throw new Error("User not found")
      }

      // If the user doesn't have a Stripe customer ID, they have no payment methods
      if (!user.stripeCustomerId) {
        throw new Error("User has no payment methods")
      }

      // Delete the payment method
      await stripe.paymentMethods.detach(paymentMethodId)

      // If this was the default payment method, clear it
      if (user.defaultPaymentMethodId === paymentMethodId) {
        user.defaultPaymentMethodId = undefined
        await user.save()
      }

      return { success: true }
    } catch (error) {
      console.error("Error deleting payment method:", error)
      throw error
    }
  }
}

export { BillingService }
