import { CardType } from 'types'

const areAnyCardSelectedById = (
  selectedCards: CardType[],
  cardIds: number[]
): boolean =>
  cardIds.some((cardId) => isCardSelectedById(selectedCards, cardId))

const findCardById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

const isCardSelectedById = (
  selectedCards: CardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const checkCardPresence = (cards: CardType[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

const capitalize = (string: string) =>
  string && string[0].toUpperCase() + string.slice(1).toLowerCase()

export const utils = {
  areAnyCardSelectedById,
  findCardById,
  isCardSelectedById,
  checkCardPresence,
  capitalize,
}
