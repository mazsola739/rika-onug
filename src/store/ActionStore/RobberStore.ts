import { BASE_TIME, robber } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class RobberStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const robberActions: RoleActionType[] = []

    robberActions.push(
      {
        text: robber.robber_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: robber.robber_close_text,
        time: BASE_TIME,
      }
    )

    return robberActions
  }
}

export default RobberStore
export const robberStore = new RobberStore()
