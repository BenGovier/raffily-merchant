import type { NextRequest } from "next/server"
import { WinnerModel } from "@/models/winner"
import { RaffleModel } from "@/models/raffle"
import { EntryModel } from "@/models/entry"
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"

// Helper function to check if user has access to a winner
async function checkWinnerAccess(winnerId: string, userId: string, isAdmin: boolean) {
  const winner = await WinnerModel.findById(winnerId)

  if (!winner) {
    return { access: false, winner: null, reason: "not_found" }
  }

  // Admins have access to all winners
  if (isAdmin) {
    return { access: true, winner, reason: null }
  }

  // Check if the user is the owner of the raffle this winner belongs to
  const raffle = await RaffleModel.findById(winner.raffleId)

  if (!raffle) {
    return { access: false, winner, reason: "raffle_not_found" }
  }

  const isOwner = raffle.merchantId.toString() === userId

  if (!isOwner) {
    return { access: false, winner, reason: "forbidden" }
  }

  return { access: true, winner, reason: null }
}

// GET a specific winner
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the winner
    const { access, winner, reason } = await checkWinnerAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Winner")
      } else if (reason === "raffle_not_found") {
        return notFoundResponse("Raffle associated with this winner")
      } else {
        return forbiddenResponse("You don't have access to this winner")
      }
    }

    // Get entry details
    const entry = await EntryModel.findById(winner.entryId)

    return successResponse({
      winner: {
        ...winner,
        _id: winner._id?.toString(),
        raffleId: winner.raffleId.toString(),
        entryId: winner.entryId.toString(),
        entry: entry
          ? {
              ...entry,
              _id: entry._id?.toString(),
              raffleId: entry.raffleId.toString(),
            }
          : null,
      },
    })
  } catch (error) {
    console.error("Error fetching winner:", error)
    return errorResponse("Failed to fetch winner", 500)
  }
}

// DELETE a winner
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if user has access to the winner
    const { access, winner, reason } = await checkWinnerAccess(params.id, token.id, token.role === "admin")

    if (!access) {
      if (reason === "not_found") {
        return notFoundResponse("Winner")
      } else if (reason === "raffle_not_found") {
        return notFoundResponse("Raffle associated with this winner")
      } else {
        return forbiddenResponse("You don't have access to this winner")
      }
    }

    // Delete the winner
    const success = await WinnerModel.delete(params.id)

    if (!success) {
      return notFoundResponse("Winner")
    }

    return successResponse({ message: "Winner deleted successfully" })
  } catch (error) {
    console.error("Error deleting winner:", error)
    return errorResponse("Failed to delete winner", 500)
  }
}

