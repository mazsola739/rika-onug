import { BASE_TIME, switcheroo } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SwitcherooStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const switcherooActions: RoleActionType[] = []

    switcherooActions.push(
      {
        text: switcheroo.switcheroo_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: switcheroo.switcheroo_close_text,
        time: BASE_TIME,
      }
    )

    return switcherooActions
  }
}

export default SwitcherooStore
export const switcherooStore = new SwitcherooStore()
