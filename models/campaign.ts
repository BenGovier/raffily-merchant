import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"

export interface Campaign {
  _id?: ObjectId
  merchantId: ObjectId
  type: "sms" | "email" | "social"
  name: string
  content: string
  recipients: number
  delivered?: number
  opened?: number
  clicked?: number
  status: "draft" | "scheduled" | "sent" | "failed"
  scheduledFor?: Date
  sentAt?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export class CampaignModel {
  static async findById(id: string | ObjectId): Promise<Campaign | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("campaigns").findOne({ _id }) as Promise<Campaign | null>
  }

  static async getByMerchant(
    merchantId: string | ObjectId,
    type?: "sms" | "email" | "social",
    page = 1,
    limit = 20,
  ): Promise<Campaign[]> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    const query: any = { merchantId: id }
    if (type) {
      query.type = type
    }

    return db
      .collection("campaigns")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<Campaign[]>
  }

  static async create(campaign: Omit<Campaign, "_id" | "createdAt" | "updatedAt">): Promise<Campaign> {
    const db = await getDatabase()

    const now = new Date()
    const campaignRecord = {
      ...campaign,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("campaigns").insertOne(campaignRecord)
    return { ...campaignRecord, _id: result.insertedId } as Campaign
  }

  static async update(
    id: string | ObjectId,
    updates: Partial<Omit<Campaign, "_id" | "merchantId" | "createdAt">>,
  ): Promise<Campaign | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const updatedCampaign = {
      ...updates,
      updatedAt: new Date(),
    }

    await db.collection("campaigns").updateOne({ _id }, { $set: updatedCampaign })

    return this.findById(_id)
  }

  static async delete(id: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("campaigns").deleteOne({ _id })
    return result.deletedCount === 1
  }

  static async getStats(merchantId: string | ObjectId, type?: "sms" | "email" | "social"): Promise<any> {
    const db = await getDatabase()
    const id = typeof merchantId === "string" ? new ObjectId(merchantId) : merchantId

    const query: any = { merchantId: id }
    if (type) {
      query.type = type
    }

    const campaigns = await db.collection("campaigns").find(query).toArray()

    return {
      total: campaigns.length,
      sent: campaigns.filter((c) => c.status === "sent").length,
      recipients: campaigns.reduce((sum, c) => sum + (c.recipients || 0), 0),
      delivered: campaigns.reduce((sum, c) => sum + (c.delivered || 0), 0),
      opened: campaigns.reduce((sum, c) => sum + (c.opened || 0), 0),
      clicked: campaigns.reduce((sum, c) => sum + (c.clicked || 0), 0),
    }
  }
}
