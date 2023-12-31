import { seer, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SeerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const seerActions: RoleActionType[] = []

    seerActions.push(
      {
        text: seer.seer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
