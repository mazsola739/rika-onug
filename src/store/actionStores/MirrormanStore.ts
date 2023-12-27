import { BASE_TIME, mirrorman } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

//todo if copycat & doppelgänger ?

class MirrormanStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const mirrormanActions: RoleActionType[] = []

    mirrormanActions.push(
      {
        text: mirrorman.mirrorman_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: mirrorman.mirrorman_close_text,
        time: BASE_TIME,
      }
    )

    return mirrormanActions
  }
}

export default MirrormanStore
export const mirrormanStore = new MirrormanStore()
