import { emptyCard, emptyToken, roles } from 'constant'
import { CardType, TokenType } from 'types'

const createEmptyCard = (): CardType => {
  return emptyCard
}

const createEmptyToken = (): TokenType => {
  return emptyToken
}

const containsById = (selectedCards: CardType[], cardId: number): boolean =>
  selectedCards.some((card) => card.id === cardId)

const containsByName = (selectedCards: CardType[], cardName: string): boolean =>
  selectedCards.some((card) => card.display_name === cardName)

const deselectCard = (selectedCards: CardType[], card: CardType): void => {
  const index = selectedCards.findIndex(
    (selectedCard) => selectedCard.id === card.id
  )
  if (index !== -1) selectedCards.splice(index, 1)
}

const determineTotalPlayers = (
  totalCharacters: number,
  selectedCards: CardType[]
): number => {
  const hasAlphaWolf = containsByName(selectedCards, roles.role_alphawolf)
  const hasTemptress = containsByName(selectedCards, roles.role_temptress)

  let totalPlayers
  if (hasAlphaWolf && hasTemptress) totalPlayers = totalCharacters - 5
  else if (hasAlphaWolf || hasTemptress) totalPlayers = totalCharacters - 4
  else totalPlayers = totalCharacters - 3

  return Math.max(totalPlayers, 0)
}

const selectCard = (selectedCards: CardType[], card: CardType): void => {
  selectedCards.push(card)
}

export const deckStoreUtils = {
  createEmptyCard,
  createEmptyToken,
  containsById,
  deselectCard,
  determineTotalPlayers,
  selectCard,
}
