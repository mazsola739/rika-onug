import { BASE_TIME, seer } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SeerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const seerActions: RoleActionType[] = []

    seerActions.push(
      {
        text: seer.seer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: seer.seer_close_text,
        time: BASE_TIME,
      }
    )

    return seerActions
  }
}

export default SeerStore
export const seerStore = new SeerStore()
