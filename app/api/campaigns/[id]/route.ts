import { NextResponse } from "next/server"
import { CampaignModel } from "@/models/campaign"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 })
    }

    // Get campaign
    const campaign = await CampaignModel.findById(id)

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      campaign: {
        ...campaign,
        _id: campaign._id?.toString(),
        merchantId: campaign.merchantId.toString(),
        createdAt: campaign.createdAt.toISOString(),
        updatedAt: campaign.updatedAt.toISOString(),
        scheduledFor: campaign.scheduledFor?.toISOString(),
        sentAt: campaign.sentAt?.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch campaign" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const updates = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 })
    }

    // Update campaign
    const campaign = await CampaignModel.update(id, updates)

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      campaign: {
        ...campaign,
        _id: campaign._id?.toString(),
        merchantId: campaign.merchantId.toString(),
        createdAt: campaign.createdAt.toISOString(),
        updatedAt: campaign.updatedAt.toISOString(),
        scheduledFor: campaign.scheduledFor?.toISOString(),
        sentAt: campaign.sentAt?.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error updating campaign:", error)
    return NextResponse.json({ success: false, error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 })
    }

    // Delete campaign
    const success = await CampaignModel.delete(id)

    if (!success) {
      return NextResponse.json({ error: "Campaign not found or could not be deleted" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Campaign deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return NextResponse.json({ success: false, error: "Failed to delete campaign" }, { status: 500 })
  }
}
