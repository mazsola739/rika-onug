import { CardType } from 'types'

const checkCardPresence = (cards: CardType[], cardId: number): boolean =>
  cards.some((card) => card.id === cardId)

const filterCardsByIds = (
  cards: CardType[],
  idsToCheck: number[]
): CardType[] => cards.filter((card) => idsToCheck.includes(card.id))

const getRandomItemFromArray = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

export const gameTableStoreUtils = {
  checkCardPresence,
  filterCardsByIds,
  getRandomItemFromArray,
}
