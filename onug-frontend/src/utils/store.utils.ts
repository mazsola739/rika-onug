import { default_card, default_player, default_token, TEAMS } from 'constant'
import { artifacts, cards, marks } from 'data'
import { deckStore } from 'store'
import { CardJson, PlayerType, TeamsType, TokenJson } from 'types'

export const createDefaultCard = (): CardJson => default_card
export const createDefaultToken = (): TokenJson => default_token
export const createDefaultPlayer = (): PlayerType => default_player

export const determineTotalPlayers = (totalCharacters: number): number => {
  const { hasAlphawolf, hasTemptress } = deckStore

  let totalPlayers
  if (hasAlphawolf && hasTemptress) totalPlayers = totalCharacters - 5
  else if (hasAlphawolf || hasTemptress) totalPlayers = totalCharacters - 4
  else totalPlayers = totalCharacters - 3

  return Math.max(totalPlayers, 0)
}

export const formatPositionSimply = (position: string) => {
  return position
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        if (word.toLowerCase() === 'player') return 'P';
        if (word.toLowerCase() === 'center') return 'C';
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

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

export const getArtifactById = (id: number): TokenJson | null => artifacts.find(artifact => artifact.id === id) || null

export const getOrderedTeams = (teamArray: string[]): string[] => teamArray.sort((a, b) => TEAMS[a as keyof TeamsType] - TEAMS[b as keyof TeamsType])
