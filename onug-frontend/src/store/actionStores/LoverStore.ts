import { lovers, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class LoverStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const loversActions: RoleActionType[] = []

    loversActions.push(
      {
        text: lovers.lovers_wake_text,
        time: BASE_TIME,
        image: 'markoflove',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: lovers.lovers_close_text,
        time: BASE_TIME,
        image: 'markoflove',
      }
    )

    return loversActions
  }
}

export default LoverStore
export const loverStore = new LoverStore()
