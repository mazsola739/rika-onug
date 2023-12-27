import { BASE_TIME, voodoolou } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class VoodoolouStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const voodoolouActions: RoleActionType[] = []

    voodoolouActions.push(
      {
        text: voodoolou.voodoolou_wake_1_text,
        time: BASE_TIME,
      },
      {
        text: voodoolou.voodoolou_wake_2_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: voodoolou.voodoolou_close_text,
        time: BASE_TIME,
      }
    )

    return voodoolouActions
  }
}

export default VoodoolouStore
export const voodoolouStore = new VoodoolouStore()
