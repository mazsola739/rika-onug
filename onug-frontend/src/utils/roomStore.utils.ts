import { CardType } from 'types'

const checkCardPresence = (cards: CardType[], cardId: number): boolean => {
  return cards.some((card) => card.id === cardId)
}

const filterCardsByIds = (
  cards: CardType[],
  idsToCheck: number[]
): CardType[] => {
  return cards.filter((card) => idsToCheck.includes(card.id))
}

const getRandomItemFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const roomStoreUtils = {
  checkCardPresence,
  filterCardsByIds,
  getRandomItemFromArray,
}
