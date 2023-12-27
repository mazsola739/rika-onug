import { BASE_TIME, lovers } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class LoverStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const loversActions: RoleActionType[] = []

    loversActions.push(
      {
        text: lovers.lovers_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: lovers.lovers_close_text,
        time: BASE_TIME,
      }
    )

    return loversActions
  }
}

export default LoverStore
export const loverStore = new LoverStore()
