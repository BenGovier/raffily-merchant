import type { NextRequest } from "next/server"
import { RaffleModel } from "@/models/raffle"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/db-init"
import { validateRequest } from "@/lib/api-validation"
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from "@/lib/api-response"
import { z } from "zod"
import { getToken } from "next-auth/jwt"

// Schema for updating a raffle
const updateRaffleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  prize: z.string().min(3, "Prize must be at least 3 characters").optional(),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date format" })
    .optional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date format" })
    .optional(),
  status: z.enum(["draft", "active", "completed", "cancelled"]).optional(),
  rules: z.string().optional(),
  termsAndConditions: z.string().optional(),
  image: z.string().optional(),
})

// Helper function to check if user has access to a raffle
async function checkRaffleAccess(raffleId: string, userId: string, isAdmin: boolean) {
  const raffle = await RaffleModel.findById(raffleId)

  if (!raffle) {
    return { access: false, raffle: null, reason: "not_found" }
  }

  // Admins have access to all raffles
  if (isAdmin) {
    return { access: true, raffle, reason: null }
  }

  // Check if the user is the owner of the raffle
  const isOwner = raffle.merchantId.toString() === userId

  if (!isOwner) {
    return { access: false, raffle, reason: "forbidden" }
  }

  return { access: true, raffle, reason: null }
}

// GET a specific raffle
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the raffle
    const { access, raffle, reason } = await checkRaffleAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Raffle")
      } else {
        return forbiddenResponse("You don't have access to this raffle")
      }
    }

    return successResponse({
      raffle: {
        ...raffle,
        _id: raffle._id?.toString(),
        merchantId: raffle.merchantId.toString(),
      },
    })
  } catch (error) {
    console.error("Error fetching raffle:", error)
    return errorResponse("Failed to fetch raffle", 500)
  }
}

// PUT update a raffle
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the raffle
    const { access, reason } = await checkRaffleAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Raffle")
      } else {
        return forbiddenResponse("You don't have access to this raffle")
      }
    }

    // Validate request body
    const validation = await validateRequest(request, updateRaffleSchema)
    if (!validation.success) {
      return validation.response
    }

    const data = validation.data

    // Convert string dates to Date objects
    if (data.startDate) data.startDate = new Date(data.startDate)
    if (data.endDate) data.endDate = new Date(data.endDate)

    const success = await RaffleModel.update(params.id, data)

    if (!success) {
      return notFoundResponse("Raffle")
    }

    const updatedRaffle = await RaffleModel.findById(params.id)

    return successResponse({
      raffle: {
        ...updatedRaffle,
        _id: updatedRaffle._id?.toString(),
        merchantId: updatedRaffle.merchantId.toString(),
      },
    })
  } catch (error) {
    console.error("Error updating raffle:", error)
    return errorResponse("Failed to update raffle", 500)
  }
}

// DELETE a raffle
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the raffle
    const { access, reason } = await checkRaffleAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Raffle")
      } else {
        return forbiddenResponse("You don't have access to this raffle")
      }
    }

    // First, check if the raffle exists
    const raffle = await RaffleModel.findById(params.id)

    if (!raffle) {
      return notFoundResponse("Raffle")
    }

    // Delete the raffle
    const db = await getDatabase()
    await db.collection("raffles").deleteOne({ _id: new ObjectId(params.id) })

    // Also delete related entries
    await db.collection("entries").deleteMany({ raffleId: new ObjectId(params.id) })

    return successResponse({ message: "Raffle deleted successfully" })
  } catch (error) {
    console.error("Error deleting raffle:", error)
    return errorResponse("Failed to delete raffle", 500)
  }
}
