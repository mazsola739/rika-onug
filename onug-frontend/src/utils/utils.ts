import { ActionCardType } from 'types'

const areAllCardsSelectedById = (
  selectedCards: ActionCardType[],
  cardIds: number[]
): boolean =>
  cardIds.every((cardId) => isCardSelectedById(selectedCards, cardId))

const areAnyCardsSelectedById = (
  selectedCards: ActionCardType[],
  cardIds: number[]
): boolean =>
  cardIds.some((cardId) => isCardSelectedById(selectedCards, cardId))

const findById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

const isCardSelectedById = (
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const pickRandomKey = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[Math.floor(Math.random() * keys.length)] as keyof T
}

export const utils = {
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  findById,
  isCardSelectedById,
  pickRandomKey,
}
