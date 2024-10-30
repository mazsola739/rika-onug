import { default_card, default_player, default_table_player_card, default_token, TEAMS } from 'constant'
import { deckStore } from 'store'
import { CardJson, Player, TablePlayerCard, TeamsType, TokenJson } from 'types'

export const createDefaultCard = (): CardJson => default_card
export const createDefaultToken = (): TokenJson => default_token

export const createDefaultPlayer = (): Player => default_player
export const createDefaultTablePlayerCard = (): TablePlayerCard => default_table_player_card

export const determineTotalPlayers = (totalCharacters: number): number => {
  const { hasAlphawolf, hasTemptress } = deckStore

  let totalPlayers
  if (hasAlphawolf && hasTemptress) totalPlayers = totalCharacters - 5
  else if (hasAlphawolf || hasTemptress) totalPlayers = totalCharacters - 4
  else totalPlayers = totalCharacters - 3

  return Math.max(totalPlayers, 0)
}

export const filterByExpansions = <T extends { expansion: string }>(list: T[], expansions: string[]): T[] => list.filter((item) => expansions.includes(item.expansion))

export const getFilteredCardsForTeam = (team: string, deck: CardJson[]): CardJson[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]

  return deck.filter((card) => validTeams.includes(card.team))
}

export const getOrderedTeams = (teamArray: string[]): string[] => 
  teamArray.sort((a, b) => TEAMS[a as keyof TeamsType] - TEAMS[b as keyof TeamsType])
