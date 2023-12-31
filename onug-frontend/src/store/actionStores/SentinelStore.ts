import { sentinel, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SentinelStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const sentinelActions: RoleActionType[] = []

    sentinelActions.push(
      {
        text: sentinel.sentinel_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
