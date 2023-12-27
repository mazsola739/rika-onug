import { BASE_TIME, masons } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MasonStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const masonActions: RoleActionType[] = []

    masonActions.push(
      {
        text: masons.mason_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: masons.mason_close_text,
        time: BASE_TIME,
      }
    )

    return masonActions
  }
}

export default MasonStore
export const masonStore = new MasonStore()
