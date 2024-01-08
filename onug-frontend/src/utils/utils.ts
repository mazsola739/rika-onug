import { time } from 'constant'
import { ActionCardType, RoleActionType } from 'types'

const areAllCardsSelectedById = (
  selectedCards: ActionCardType[],
  cardIds: number[]
): boolean =>
  cardIds.every((cardId) => isCardSelectedById(selectedCards, cardId))

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

const generateTimedAction = (actionTime: number): RoleActionType => ({
  text: `${time.timertext_prefix}${actionTime}${time.timertext_postfix}`,
  time: actionTime,
  image: '',
})

const isCardSelectedById = (
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const getRandomItemFromArray = <T>(array: T[]): T =>
  array[getRandomNumber(0, array.length - 1)]

const getRandomNumber = (min: number, max: number): number =>
  ~~(Math.random() * (max - min + 1)) + min

const selectRandomKey = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[getRandomNumber(0, keys.length - 1)] as keyof T
}

export const utils = {
  areAllCardsSelectedById,
  areAnyCardSelectedById,
  findCardById,
  generateTimedAction,
  isCardSelectedById,
  getRandomItemFromArray,
  getRandomNumber,
  selectRandomKey,
}
