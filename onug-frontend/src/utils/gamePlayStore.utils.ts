import { RoleActionType } from 'types'

const addBasicAction = (
  actions: RoleActionType[],
  text: string,
  time: number
): void => {
  actions.push({ text, time })
}

export const gamePlayStoreUtils = {
  addBasicAction,
}
