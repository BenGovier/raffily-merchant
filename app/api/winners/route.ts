import type { NextRequest } from "next/server"
import { WinnerModel } from "@/models/winner"
import { RaffleModel } from "@/models/raffle"
import { EntryModel } from "@/models/entry"
import { ObjectId } from "mongodb"
import { validateRequest } from "@/lib/api-validation"
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from "@/lib/api-response"
import { z } from "zod"
import { getToken } from "next-auth/jwt"

// Schema for selecting a winner
const selectWinnerSchema = z.object({
  raffleId: z.string().min(1, "Raffle ID is required"),
  numberOfWinners: z.number().int().positive().default(1),
  manualEntryIds: z.array(z.string()).optional(),
})

// GET winners (with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const raffleId = searchParams.get("raffleId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Build query
    const query: any = {}

    if (raffleId) {
      // Check if user has access to the raffle
      const raffle = await RaffleModel.findById(raffleId)

      if (!raffle) {
        return notFoundResponse("Raffle")
      }

      // Only allow access if admin or raffle owner
      if (token.role !== "admin" && raffle.merchantId.toString() !== token.id) {
        return errorResponse("Forbidden: You don't have access to this raffle's winners", 403)
      }

      query.raffleId = new ObjectId(raffleId)
    } else {
      // If no raffleId specified, only admins can list all winners
      // For merchants, we need to find all their raffles first
      if (token.role !== "admin") {
        const userRaffles = await RaffleModel.findByMerchant(token.id)
        const raffleIds = userRaffles.map((raffle) => raffle._id)

        if (raffleIds.length === 0) {
          // User has no raffles, return empty array
          return successResponse({
            winners: [],
            pagination: {
              page,
              limit,
              totalCount: 0,
              totalPages: 0,
            },
          })
        }

        query.raffleId = { $in: raffleIds }
      }
    }

    // Get winners
    const winners = await WinnerModel.find(query, page, limit)

    // Get total count for pagination
    const totalCount = await WinnerModel.count(query)

    return successResponse({
      winners: await Promise.all(
        winners.map(async (winner) => {
          // Get entry details for each winner
          const entry = await EntryModel.findById(winner.entryId)

          return {
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
          }
        }),
      ),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching winners:", error)
    return errorResponse("Failed to fetch winners", 500)
  }
}

// POST select winners for a raffle
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateRequest(request, selectWinnerSchema)
    if (!validation.success) {
      return validation.response
    }

    const { raffleId, numberOfWinners, manualEntryIds } = validation.data

    // Get the authenticated user
    const token = await getToken({ req: request })

    if (!token?.id) {
      return errorResponse("Unauthorized", 401)
    }

    // Check if raffle exists
    const raffle = await RaffleModel.findById(raffleId)

    if (!raffle) {
      return notFoundResponse("Raffle")
    }

    // Check if user has access to the raffle
    if (token.role !== "admin" && raffle.merchantId.toString() !== token.id) {
      return forbiddenResponse("You don't have access to this raffle")
    }

    const winners = []

    if (manualEntryIds && manualEntryIds.length > 0) {
      // Manual winner selection
      for (const entryId of manualEntryIds) {
        const entry = await EntryModel.findById(entryId)

        if (!entry) {
          return notFoundResponse(`Entry with ID ${entryId}`)
        }

        if (entry.raffleId.toString() !== raffleId) {
          return errorResponse(`Entry with ID ${entryId} does not belong to this raffle`, 400)
        }

        // Check if entry is already a winner
        const existingWinner = await WinnerModel.findByEntryId(entryId)

        if (existingWinner) {
          return errorResponse(`Entry with ID ${entryId} is already a winner`, 400)
        }

        // Create winner
        const winner = await WinnerModel.create({
          raffleId: new ObjectId(raffleId),
          entryId: new ObjectId(entryId),
          selectionMethod: "manual",
        })

        winners.push({
          ...winner,
          _id: winner._id?.toString(),
          raffleId: winner.raffleId.toString(),
          entryId: winner.entryId.toString(),
          entry,
        })
      }
    } else {
      // Random winner selection
      // Get all entries for the raffle
      const entries = await EntryModel.findByRaffle(raffleId)

      if (entries.length === 0) {
        return errorResponse("No entries found for this raffle", 400)
      }

      // Get existing winners
      const existingWinners = await WinnerModel.findByRaffle(raffleId)
      const existingWinnerEntryIds = existingWinners.map((w) => w.entryId.toString())

      // Filter out entries that are already winners
      const eligibleEntries = entries.filter((entry) => !existingWinnerEntryIds.includes(entry._id!.toString()))

      if (eligibleEntries.length === 0) {
        return errorResponse("All entries are already winners", 400)
      }

      // Randomly select winners
      const selectedEntries = []
      const numToSelect = Math.min(numberOfWinners, eligibleEntries.length)

      for (let i = 0; i < numToSelect; i++) {
        // Select a random entry
        const randomIndex = Math.floor(Math.random() * eligibleEntries.length)
        const selectedEntry = eligibleEntries.splice(randomIndex, 1)[0]
        selectedEntries.push(selectedEntry)
      }

      // Create winners
      for (const entry of selectedEntries) {
        const winner = await WinnerModel.create({
          raffleId: new ObjectId(raffleId),
          entryId: entry._id!,
          selectionMethod: "random",
        })

        winners.push({
          ...winner,
          _id: winner._id?.toString(),
          raffleId: winner.raffleId.toString(),
          entryId: winner.entryId.toString(),
          entry,
        })
      }
    }

    // If raffle is completed, update its status
    if (raffle.status !== "completed") {
      await RaffleModel.update(raffleId, { status: "completed" })
    }

    return successResponse(
      {
        winners: winners.map((winner) => ({
          ...winner,
          entry: {
            ...winner.entry,
            _id: winner.entry._id?.toString(),
            raffleId: winner.entry.raffleId.toString(),
          },
        })),
      },
      201,
    )
  } catch (error) {
    console.error("Error selecting winners:", error)
    return errorResponse("Failed to select winners", 500)
  }
}
