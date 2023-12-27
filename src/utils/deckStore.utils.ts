import { emptyCard, emptyToken, teams } from 'constant'
import { CardType, TokenType, TeamsType } from 'types'

const createEmptyCard = (): CardType => {
  return emptyCard
}

const createEmptyToken = (): TokenType => {
  return emptyToken
}

const getOrderedTeams = (teamArray: string[]): string[] => {
  return teamArray.sort(
    (a, b) => teams[a as keyof TeamsType] - teams[b as keyof TeamsType]
  )
}

const getFilteredCardsForTeam = (
  team: string,
  deck: CardType[]
): CardType[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]
  return deck.filter((card) => validTeams.includes(card.team))
}

export const deckStoreUtils = {
  createEmptyCard,
  createEmptyToken,
  getFilteredCardsForTeam,
  getOrderedTeams,
}
