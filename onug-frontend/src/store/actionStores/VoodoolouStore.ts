import { voodoolou, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

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
        image: 'onus_voodoo_lou',
      },
      {
        text: voodoolou.voodoolou_wake_2_text,
        time: BASE_TIME,
        image: 'onus_voodoo_lou',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: voodoolou.voodoolou_close_text,
        time: BASE_TIME,
        image: 'onus_voodoo_lou',
      }
    )

    return voodoolouActions
  }
}

export default VoodoolouStore
export const voodoolouStore = new VoodoolouStore()
