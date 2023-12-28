import {
  identifier,
  identifier_player,
  joke,
  psychicStoreKeys,
  random_psychic,
  time,
} from 'constant'
import { ActionCardType, RoleActionStoreType, RoleActionType } from 'types'

const isCardSelectedById = (
  selectedCards: ActionCardType[],
  cardId: number
): boolean => selectedCards.some((card) => card.id === cardId)

const areAnyCardsSelectedById = (
  selectedCards: ActionCardType[],
  cardIds: number[]
): boolean =>
  cardIds.some((cardId) => isCardSelectedById(selectedCards, cardId))

const areAllCardsSelectedById = (
  selectedCards: ActionCardType[],
  cardIds: number[]
): boolean =>
  cardIds.every((cardId) => isCardSelectedById(selectedCards, cardId))

const addRoleActions = <T extends RoleActionStoreType>(
  store: T,
  condition: boolean,
  actions: RoleActionType[]
): void => {
  if (condition) {
    actions.push(...store.generateActions())
  }
}

const getRandomKeyFromObject = <T>(obj: T): keyof T => {
  const keys = Object.keys(obj)
  return keys[Math.floor(Math.random() * keys.length)] as keyof T
}

const formatActionTimeText = (actionTime: number): string =>
  `${time.timertext_prefix}${actionTime}${time.timertext_postfix}`

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

const generateTimedAction = (actionTime: number): RoleActionType => ({
  text: `${time.timertext_prefix}${actionTime}${time.timertext_postfix}`,
  time: actionTime,
})

const getRandomJoke = (): string => joke[getRandomKeyFromObject(joke)]

const getRandomPsychicActionAndText = (): {
  actionText: string
  chosenText: string
} => {
  const randomActionKey =
    Object.keys(random_psychic)[
      Math.floor(Math.random() * Object.keys(random_psychic).length)
    ]
  const actionText =
    random_psychic[randomActionKey as keyof typeof random_psychic]
  const chosenKey =
    psychicStoreKeys[Math.floor(Math.random() * psychicStoreKeys.length)]
  const chosenText = identifier[chosenKey as keyof typeof identifier]
  return { actionText, chosenText }
}

export const actionStoreUtils = {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  formatActionTimeText,
  generateTimedAction,
  getRandomJoke,
  getRandomKeyFromObject,
  getRandomPsychicActionAndText,
  isCardSelectedById,
  pickRandomPlayers,
}
