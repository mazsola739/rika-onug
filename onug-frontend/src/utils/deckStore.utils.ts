import { emptyCard, emptyToken, teams } from 'constant'
import { CardType, TokenType, TeamsType } from 'types'

const createEmptyCard = (): CardType => {
  return emptyCard
}

const createEmptyToken = (): TokenType => {
  return emptyToken
}

const findById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

const filterByExpansions = <T extends { expansion: string }>(
  list: T[],
  expansions: string[]
): T[] => {
  return list.filter((item) => expansions.includes(item.expansion))
}

const getFilteredCardsForTeam = (
  team: string,
  deck: CardType[]
): CardType[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]
  return deck.filter((card) => validTeams.includes(card.team))
}

const getOrderedTeams = (teamArray: string[]): string[] => {
  return teamArray.sort(
    (a, b) => teams[a as keyof TeamsType] - teams[b as keyof TeamsType]
  )
}

export const deckStoreUtils = {
  createEmptyCard,
  createEmptyToken,
  getFilteredCardsForTeam,
  getOrderedTeams,
  findById,
  filterByExpansions,
}
