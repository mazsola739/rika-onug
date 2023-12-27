import { BASE_TIME, selfawarenessgirl } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SelfawarenessgirlStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const selfawarenessgirlActions: RoleActionType[] = []

    selfawarenessgirlActions.push(
      {
        text: selfawarenessgirl.selfawarenessgirl_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: selfawarenessgirl.selfawarenessgirl_close_text,
        time: BASE_TIME,
      }
    )

    return selfawarenessgirlActions
  }
}

export default SelfawarenessgirlStore
export const selfawarenessgirlStore = new SelfawarenessgirlStore()
