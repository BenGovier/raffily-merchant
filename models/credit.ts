import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"

export interface Credit {
  _id?: ObjectId
  merchantId: ObjectId
  amount: number
  transactionId?: string
  type: "purchase" | "usage" | "refund" | "bonus"
  description?: string
  metadata?: Record<string, any>
  createdAt: Date
}

export class CreditModel {
  static async findById(id: string | ObjectId): Promise<Credit | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("credits").findOne({ _id }) as Promise<Credit | null>
  }

  static async getByMerchant(merchantId: string | ObjectId, page = 1, limit = 20): Promise<Credit[]> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    return db
      .collection("credits")
      .find({ merchantId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Credit[]>
  }

  static async addCredits(
    merchantId: string | ObjectId,
    amount: number,
    type: "purchase" | "refund" | "bonus" = "purchase",
    transactionId?: string,
    description?: string,
    metadata?: Record<string, any>,
  ): Promise<Credit> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    const creditRecord = {
      merchantId: id,
      amount,
      transactionId,
      description: description || `Added ${amount} credits via ${type}`,
      type,
      metadata,
      createdAt: new Date(),
    }

    const result = await db.collection("credits").insertOne(creditRecord)
    return { ...creditRecord, _id: result.insertedId } as Credit
  }

  static async useCredits(
    merchantId: string | ObjectId,
    amount: number,
    description?: string,
    metadata?: Record<string, any>,
  ): Promise<{ success: boolean; message: string; remainingCredits: number; credit?: Credit }> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    // Check if merchant has enough credits
    const balance = await this.getBalance(merchantId)
    if (balance < amount) {
      return {
        success: false,
        message: `Insufficient credits. Need ${amount} credits, but only have ${balance}.`,
        remainingCredits: balance,
      }
    }

    const creditRecord = {
      merchantId: id,
      amount: -amount, // Negative amount for usage
      description: description || `Used ${amount} credits`,
      type: "usage" as const,
      metadata,
      createdAt: new Date(),
    }

    const result = await db.collection("credits").insertOne(creditRecord)
    const credit = { ...creditRecord, _id: result.insertedId } as Credit

    return {
      success: true,
      message: `Successfully used ${amount} credits.`,
      remainingCredits: balance - amount,
      credit,
    }
  }

  static async getBalance(merchantId: string | ObjectId): Promise<number> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    const credits = await db.collection("credits").find({ merchantId: id }).toArray()

    // Sum all credits (positive for purchases/refunds/bonuses, negative for usage)
    return credits.reduce((total, credit) => {
      if (credit.type === "usage") {
        return total - Math.abs(credit.amount) // Ensure we subtract the absolute value
      } else {
        return total + credit.amount
      }
    }, 0)
  }

  static async getTransactionHistory(merchantId: string | ObjectId, page = 1, limit = 20): Promise<Credit[]> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    return db
      .collection("credits")
      .find({ merchantId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Credit[]>
  }
}
