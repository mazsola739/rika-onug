import { voodoolou, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class VoodoolouStore {
  constructor() {
    makeAutoObservable(this)
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
      generateTimedAction(ACTION_TIME),
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
