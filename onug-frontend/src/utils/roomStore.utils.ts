import { CardType } from 'types'

const getRandomItemFromArray = <T>(array: T[]): T | undefined => {
  return array[Math.floor(Math.random() * array.length)]
}

const filterCardsByIds = (
  cards: CardType[],
  idsToCheck: number[]
): CardType[] => {
  return cards.filter((card) => idsToCheck.includes(card.id))
}

export const roomStoreUtils = {
  getRandomItemFromArray,
  filterCardsByIds,
}
