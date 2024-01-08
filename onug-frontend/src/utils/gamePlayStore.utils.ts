import { joke } from 'constant'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { selectRandomKey } = utils

const addBasicAction = (
  actions: RoleActionType[],
  text: string,
  time: number,
  image: string
): void => {
  actions.push({ text, time, image })
}

const getRandomJoke = (): string => `JOKE: ${joke[selectRandomKey(joke)]}`

export const gamePlayStoreUtils = {
  addBasicAction,
  getRandomJoke,
}
