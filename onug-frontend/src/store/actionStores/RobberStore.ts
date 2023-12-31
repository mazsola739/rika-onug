import { robber, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class RobberStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const robberActions: RoleActionType[] = []

    robberActions.push(
      {
        text: robber.robber_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
