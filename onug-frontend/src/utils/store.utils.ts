import { default_card, default_player, default_table_player_card, default_token, TEAMS } from 'constant'
import { artifacts, cards, marks } from 'data'
import { deckStore } from 'store'
import { CardJson, PlayerType, TablePlayerCard, TeamsType, TokenJson } from 'types'

export const createDefaultCard = (): CardJson => default_card
export const createDefaultToken = (): TokenJson => default_token
export const createDefaultPlayer = (): PlayerType => default_player
export const createDefaultTablePlayerCard = (): TablePlayerCard => default_table_player_card

export const determineTotalPlayers = (totalCharacters: number): number => {
  const { hasAlphawolf, hasTemptress } = deckStore

  let totalPlayers
  if (hasAlphawolf && hasTemptress) totalPlayers = totalCharacters - 5
  else if (hasAlphawolf || hasTemptress) totalPlayers = totalCharacters - 4
  else totalPlayers = totalCharacters - 3

  return Math.max(totalPlayers, 0)
}

export const filterByExpansions = <T extends { expansion: string }>(list: T[], expansions: string[]): T[] => list.filter(item => expansions.includes(item.expansion))

export const formatPosition = (position: string) =>
  position
    .replace(/player_/g, ' ')
    .replace(/center_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())

export const formatPositionSimply = (position: string) => position.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

export const getCardById = (cardId: number): CardJson | null => {
  if (cardId === 87) {
    return cards.find(card => card.id === 87) || null
  }

  return deckStore.deck.find(card => card.id === cardId) || null
}

export const getFilteredCardsForTeam = (team: string, deck: CardJson[]): CardJson[] => {
  const validTeams = team === 'village' ? ['hero', 'village'] : [team]

  return deck.filter(card => validTeams.includes(card.team))
}

export const getMarkByName = (markName: string): TokenJson | null => marks.find(mark => mark.token_name === markName) || null

export const getMarkById = (id: number): TokenJson | null => marks.find(mark => mark.id === id) || null

export const getArtifactById = (id: number): TokenJson | null => artifacts.find(artifact => artifact.id === id) || null

export const getOrderedTeams = (teamArray: string[]): string[] => teamArray.sort((a, b) => TEAMS[a as keyof TeamsType] - TEAMS[b as keyof TeamsType])
