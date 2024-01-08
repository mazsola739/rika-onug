import { CardType } from 'types'

const checkCardPresence = (cards: CardType[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

const filterCardsByIds = (
  cards: CardType[],
  idsToCheck: number[]
): CardType[] => cards.filter((card) => idsToCheck.includes(card.id))

export const gameTableStoreUtils = {
  checkCardPresence,
  filterCardsByIds,
}
