import { identifier_player, roles, time } from 'constant'
import {
  ActionCardType,
  RepeatroleType,
  RoleActionStoreType,
  RoleActionType,
} from 'types'
import { utils } from 'utils'

const { pickRandomKey } = utils

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
  image: '',
})

const getRandomIndexFromArray = (
  arr: string[] | RepeatroleType[] | ActionCardType[]
): number => {
  return Math.floor(Math.random() * arr.length)
}

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

const shuffleArray = (cards: ActionCardType[]): ActionCardType[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

const shuffleAndSplitDeck = (deck: ActionCardType[]): ActionCardType[] => {
  const shuffledDeck = shuffleArray([...deck])
  const rippleDeck: ActionCardType[] = []

  const randomIndex = getRandomIndexFromArray(shuffledDeck)
  rippleDeck.push(shuffledDeck.splice(randomIndex, 1)[0])

  while (shuffledDeck.length > 0) {
    const randomIndex = getRandomIndexFromArray(shuffledDeck)
    if (Math.random() < 0.5) {
      rippleDeck.push(shuffledDeck.splice(randomIndex, 1)[0])
    } else {
      shuffledDeck.splice(randomIndex, 1)
    }
  }

  return rippleDeck
}

export const actionStoreUtils = {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  generateTimedAction,
  getRandomIndexFromArray,
  getRandomNumber,
  getRandomRoleDisplayName,
  getRandomValueFromObject,
  isCardSelectedById,
  pickRandom1Player,
  pickRandom2Players,
  pickRandomArray2Players,
  pickRandomElementFromArray,
  pickRandomUpTo3Players,
  shuffleAndSplitDeck,
}
