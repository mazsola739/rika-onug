import { CardType } from 'types'

export const areAnyCardSelectedById = (
  selectedCards: CardType[],
  cardIds: number[]
): boolean =>
  cardIds.some((cardId) => isCardSelectedById(selectedCards, cardId))

export const findCardById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

export const isCardSelectedById = (
  selectedCards: CardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

export const checkCardPresence = (cards: CardType[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

export const capitalize = (string: string) =>
  string && string[0].toUpperCase() + string.slice(1).toLowerCase()
