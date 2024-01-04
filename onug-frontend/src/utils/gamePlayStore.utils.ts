import { RoleActionType } from 'types'

const addBasicAction = (
  actions: RoleActionType[],
  text: string,
  time: number,
  image: string
): void => {
  actions.push({ text, time, image })
}

export const gamePlayStoreUtils = {
  addBasicAction,
}
