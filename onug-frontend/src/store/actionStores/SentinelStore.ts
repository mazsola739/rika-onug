import { sentinel, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

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
        image: 'onud_sentinel',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: sentinel.sentinel_close_text,
        time: BASE_TIME,
        image: 'onud_sentinel',
      }
    )

    return sentinelActions
  }
}

export default SentinelStore
export const sentinelStore = new SentinelStore()
