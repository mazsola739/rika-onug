import { ActionCardType, CardType } from 'types'

const areAnyCardSelectedById = (
  selectedCards: ActionCardType[],
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
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const checkCardPresence = (cards: CardType[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

export const utils = {
  areAnyCardSelectedById,
  findCardById,
  isCardSelectedById,
  checkCardPresence,
}
