import { BASE_TIME, nostradamus } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class NostradamusStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const nostradamusActions: RoleActionType[] = []

    //TODO after click app telling nostradamus-team

    nostradamusActions.push(
      {
        text: nostradamus.nostradamus_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: nostradamus.nostradamus_close_text,
        time: BASE_TIME,
      }
    )

    return nostradamusActions
  }
}

export default NostradamusStore
export const nostradamusStore = new NostradamusStore()
