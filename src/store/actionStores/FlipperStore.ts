import { BASE_TIME, flipper } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class FlipperStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const flipperActions: RoleActionType[] = []

    flipperActions.push(
      {
        text: flipper.flipper_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
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
