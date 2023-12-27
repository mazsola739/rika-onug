import { BASE_TIME, sentinel } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SentinelStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const sentinelActions: RoleActionType[] = []

    sentinelActions.push(
      {
        text: sentinel.sentinel_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: sentinel.sentinel_close_text,
        time: BASE_TIME,
      }
    )

    return sentinelActions
  }
}

export default SentinelStore
export const sentinelStore = new SentinelStore()
