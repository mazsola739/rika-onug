import { flipper, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class FlipperStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const flipperActions: RoleActionType[] = []

    flipperActions.push(
      {
        text: flipper.flipper_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: flipper.flipper_close_text,
        time: BASE_TIME,
      }
    )

    return flipperActions
  }
}

export default FlipperStore
export const flipperStore = new FlipperStore()
