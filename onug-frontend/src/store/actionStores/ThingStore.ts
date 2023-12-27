import { BASE_TIME, thing } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ThingStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const thingActions: RoleActionType[] = []

    thingActions.push(
      {
        text: thing.thing_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: thing.thing_close_text,
        time: BASE_TIME,
      }
    )

    return thingActions
  }
}

export default ThingStore
export const thingStore = new ThingStore()
