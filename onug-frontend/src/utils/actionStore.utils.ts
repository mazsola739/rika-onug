import { identifier_player, roles } from 'constant'
import {
  ActionCardType,
  RepeatroleType,
  RoleActionStoreType,
  RoleActionType,
} from 'types'
import { utils } from 'utils'

const { getRandomNumber, selectRandomKey } = utils

const addRoleActionsBasedOnCondition = <T extends RoleActionStoreType>(
  store: T,
  condition: boolean,
  actions: RoleActionType[]
): void => {
  if (condition) {
    actions.push(...store.generateActions())
  }
}

const getRandomRoleDisplayName = (array: RepeatroleType[]): string =>
  roles[array[getRandomNumber(0, array.length - 1)].name]

const getRandomValueFromObject = <T>(obj: Record<string, T>): T => {
  const randomKey = selectRandomKey(obj)
  return obj[randomKey]
}

const pickRandomOnePlayer = (numPlayers: number): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  return shuffledPlayers[0]
}

const pickRandomTwoPlayers = (numPlayers: number): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  const selectedPlayers = shuffledPlayers.slice(0, 2)
  return selectedPlayers.join(' and ')
}

const pickRandomTwoPlayersArray = (numPlayers: number): string[] => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  return shuffledPlayers.slice(0, 2)
}

const pickRandomUpToThreePlayers = (
  numPlayers: number,
  conjunction: string
): string => {
  const shuffledPlayers = shufflePlayers(numPlayers)
  const selectedPlayers = shuffledPlayers.slice(
    0,
    Math.min(3, shuffledPlayers.length)
  )

  return selectedPlayers.length >= 3
    ? `${selectedPlayers.slice(0, -1).join(', ')}, ${selectedPlayers.slice(-1)}`
    : selectedPlayers.join(` ${conjunction} `)
}

const shuffleCardsArray = (cards: ActionCardType[]): ActionCardType[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

const shuffleAndSplitDeck = (deck: ActionCardType[]): ActionCardType[] => {
  const shuffledDeck = shuffleCardsArray([...deck])
  const rippleDeck: ActionCardType[] = []

  rippleDeck.push(
    shuffledDeck.splice(getRandomNumber(0, shuffledDeck.length - 1), 1)[0]
  )

  while (shuffledDeck.length > 0) {
    const randomIndex = getRandomNumber(0, shuffledDeck.length - 1)
    if (Math.random() < 0.5) {
      rippleDeck.push(shuffledDeck.splice(randomIndex, 1)[0])
    } else {
      shuffledDeck.splice(randomIndex, 1)
    }
  }

  return rippleDeck
}

const shufflePlayers = (numPlayers: number): string[] => {
  const identifiers = Array.from(
    { length: numPlayers },
    (_, i) => `identifier_player${i + 1}_text`
  ).map((id) => identifier_player[id as keyof typeof identifier_player])

  return [...identifiers].sort(() => 0.5 - Math.random())
}

export const actionStoreUtils = {
  addRoleActionsBasedOnCondition,
  getRandomRoleDisplayName,
  getRandomValueFromObject,
  pickRandomOnePlayer,
  pickRandomTwoPlayers,
  pickRandomTwoPlayersArray,
  pickRandomUpToThreePlayers,
  shuffleAndSplitDeck,
}
