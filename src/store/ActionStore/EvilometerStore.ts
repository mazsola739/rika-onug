import { BASE_TIME, evilometer } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class EvilometerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const evilometerActions: RoleActionType[] = []

    evilometerActions.push(
      {
        text: evilometer.evilometer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: evilometer.evilometer_close_text,
        time: BASE_TIME,
      }
    )

    return evilometerActions
  }
}

export default EvilometerStore
export const evilometerStore = new EvilometerStore()
