import { teams } from 'constant'
import { CardType, TeamsType } from 'types'

const filterByExpansions = <T extends { expansion: string }>(
  list: T[],
  expansions: string[]
): T[] => list.filter((item) => expansions.includes(item.expansion))

const getFilteredCardsForTeam = (
  team: string,
  deck: CardType[]
): CardType[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]
  return deck.filter((card) => validTeams.includes(card.team))
}

const getOrderedTeams = (teamArray: string[]): string[] =>
  teamArray.sort(
    (a, b) => teams[a as keyof TeamsType] - teams[b as keyof TeamsType]
  )

export const roomStoreUtils = {
  getFilteredCardsForTeam,
  getOrderedTeams,
  filterByExpansions,
}
