import { TEAMS } from 'constant'
import { CardType, TeamsType } from 'types'

export const filterByExtensions = <T extends { expansion: string }>(list: T[],extensions: string[]): T[] => list.filter((item) => extensions.includes(item.expansion))

export const getFilteredCardsForTeam = (team: string, deck: CardType[]): CardType[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]
  return deck.filter((card) => validTeams.includes(card.team))
}

export const getOrderedTeams = (teamArray: string[]): string[] =>
  teamArray.sort(
    (a, b) => TEAMS[a as keyof TeamsType] - TEAMS[b as keyof TeamsType]
  )
