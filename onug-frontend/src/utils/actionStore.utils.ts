import { identifier_player, joke, time } from 'constant'
import { ActionCardType, RoleActionStoreType, RoleActionType } from 'types'

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

const getRandomIndexFromArray = (arr: string[]): number => {
  return Math.floor(Math.random() * arr.length)
}

const getRandomJoke = (): string => joke[pickRandomKey(joke)]

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomValueFromObject = <T>(obj: Record<string, T>): T => {
  const randomKey = pickRandomKey(obj)
  return obj[randomKey]
}

const isCardSelectedById = (
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

export const pickRandomElementFromArray = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const pickRandomKey = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[Math.floor(Math.random() * keys.length)] as keyof T
}

const pickRandomPlayers = (numPlayers: number, conjunction: string): string => {
  const identifiers = Array.from(
    { length: numPlayers },
    (_, i) => `identifier_player${i + 1}_text`
  ).map((id) => identifier_player[id as keyof typeof identifier_player])

  const shuffledPlayers = [...identifiers].sort(() => 0.5 - Math.random())
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

export const actionStoreUtils = {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  generateTimedAction,
  getRandomIndexFromArray,
  getRandomJoke,
  getRandomNumber,
  getRandomValueFromObject,
  isCardSelectedById,
  pickRandomElementFromArray,
  pickRandomKey,
  pickRandomPlayers,
}
