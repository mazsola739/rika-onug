import { EMPTY_CARD, EMPTY_TOKEN, ROLES } from 'constant'
import { CardType, TokenType } from 'types'

export const createEmptyCard = (): CardType => EMPTY_CARD

export const createEmptyToken = (): TokenType => EMPTY_TOKEN

export const containsById = (selectedCards: CardType[], cardId: number): boolean => selectedCards.some((card) => card.id === cardId)

export const containsByName = (selectedCards: CardType[], cardName: string): boolean => selectedCards.some((card) => card.display_name === cardName)

export const deselectCard = (selectedCards: CardType[], card: CardType): void => {
  const index = selectedCards.findIndex(selectedCard => selectedCard.id === card.id)

  if (index !== -1) selectedCards.splice(index, 1)
}

export const determineTotalPlayers = (totalCharacters: number, selectedCards: CardType[]): number => {
  const hasAlphaWolf = containsByName(selectedCards, ROLES.role_alphawolf)
  const hasTemptress = containsByName(selectedCards, ROLES.role_temptress)

  let totalPlayers
  if (hasAlphaWolf && hasTemptress) totalPlayers = totalCharacters - 5
  else if (hasAlphaWolf || hasTemptress) totalPlayers = totalCharacters - 4
  else totalPlayers = totalCharacters - 3

  return Math.max(totalPlayers, 0)
}

export const selectCard = (selectedCards: CardType[], card: CardType): void => {
  selectedCards.push(card)
}
