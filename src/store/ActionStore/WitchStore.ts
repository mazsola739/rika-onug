import { BASE_TIME, witch } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class WitchStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const witchActions: RoleActionType[] = []

    witchActions.push(
      {
        text: witch.witch_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: witch.witch_close_text,
        time: BASE_TIME,
      }
    )

    return witchActions
  }
}

export default WitchStore
export const witchStore = new WitchStore()
