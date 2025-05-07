// Client-side subject line generator as a fallback when the API fails

export function generateClientSubjectLines(raffleDetails: {
  raffleName: string
  prize: string
  deadline?: string
  businessName?: string
  additionalInfo?: string
}): string[] {
  const { raffleName, prize, deadline, businessName } = raffleDetails
  const business = businessName || "We"

  // Template-based subject line generation
  const templates = [
    `Win a ${prize} in our ${raffleName} Raffle!`,
    `Last Chance: Enter to Win ${prize}!`,
    `Don't Miss Out: ${prize} Giveaway Ending Soon!`,
    `[EXCLUSIVE] Your Chance to Win a ${prize}`,
    `${business}'re Giving Away a ${prize}! Enter Now!`,
    `${deadline ? `Hurry! ${prize} Raffle Ends on ${deadline}` : `Limited Time: Enter Our ${prize} Raffle Today`}`,
    `${business} Presents: The Amazing ${prize} Giveaway`,
    `Your Ticket to Win a ${prize} is Waiting`,
    `[GIVEAWAY] ${prize} - Enter Now!`,
    `${prize} Raffle: Your Lucky Day Awaits!`,
  ]

  // Shuffle and return 5 subject lines
  return shuffleArray(templates).slice(0, 5)
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
