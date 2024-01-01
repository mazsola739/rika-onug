import { identifier_player, joke, roles, time } from 'constant'
import {
  ActionCardType,
  RepeatroleType,
  RoleActionStoreType,
  RoleActionType,
} from 'types'

const addRoleActions = <T extends RoleActionStoreType>(
  store: T,
  condition: boolean,
  actions: RoleActionType[]
): void => {
  if (condition) {
    actions.push(...store.generateActions())
  }
}

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

const generateTimedAction = (actionTime: number): RoleActionType => ({
  text: `${time.timertext_prefix}${actionTime}${time.timertext_postfix}`,
  time: actionTime,
})

const getRandomIndexFromArray = (arr: string[] | RepeatroleType[]): number => {
  return Math.floor(Math.random() * arr.length)
}

const getRandomJoke = (): string => joke[pickRandomKey(joke)]

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomRoleDisplayName = (array: RepeatroleType[]): string => {
  const randomIndex = getRandomIndexFromArray(array)
  const roleName = array[randomIndex].name
  return roles[roleName]
}

const getRandomValueFromObject = <T>(obj: Record<string, T>): T => {
  const randomKey = pickRandomKey(obj)
  return obj[randomKey]
}

const isCardSelectedById = (
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const shufflePlayers = (numPlayers: number): string[] => {
  const identifiers = Array.from(
    { length: numPlayers },
    (_, i) => `identifier_player${i + 1}_text`
  ).map((id) => identifier_player[id as keyof typeof identifier_player])

  return [...identifiers].sort(() => 0.5 - Math.random())
}

const pickRandom1Player = (numPlayers: number): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  return shuffledPlayers[0]
}

const pickRandom2Players = (numPlayers: number): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  const selectedPlayers = shuffledPlayers.slice(0, 2)
  return selectedPlayers.join(' and ')
}

const pickRandomArray2Players = (numPlayers: number): string[] => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  return shuffledPlayers.slice(0, 2)
}

const pickRandomElementFromArray = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const pickRandomKey = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[Math.floor(Math.random() * keys.length)] as keyof T
}

const pickRandomUpTo3Players = (
  numPlayers: number,
  conjunction: string
): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  const selectedPlayers = shuffledPlayers.slice(
    0,
    Math.min(3, shuffledPlayers.length)
  )

  return selectedPlayers.length >= 3
    ? `${selectedPlayers.slice(0, -2).join(', ')}, ${selectedPlayers
        .slice(-2)
        .join(` ${conjunction} `)}`
    : selectedPlayers.join(` ${conjunction} `)
}

const shouldPushRandomly = () => Math.random() < 0.5

export const actionStoreUtils = {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  generateTimedAction,
  getRandomIndexFromArray,
  getRandomJoke,
  getRandomNumber,
  getRandomRoleDisplayName,
  getRandomValueFromObject,
  isCardSelectedById,
  pickRandom1Player,
  pickRandom2Players,
  pickRandomArray2Players,
  pickRandomElementFromArray,
  pickRandomKey,
  pickRandomUpTo3Players,
  shouldPushRandomly,
}
