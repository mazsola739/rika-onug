import { joke } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { pickRandomKey } = actionStoreUtils

const addBasicAction = (
  actions: RoleActionType[],
  text: string,
  time: number,
  image: string
): void => {
  actions.push({ text, time, image })
}

const getRandomJoke = (): string => `JOKE: ${joke[pickRandomKey(joke)]}`

export const gamePlayStoreUtils = {
  addBasicAction,
  getRandomJoke,
}
