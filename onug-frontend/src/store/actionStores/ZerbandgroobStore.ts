import { BASE_TIME, leader } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ZerbandgroobStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const zerbgroobActions: RoleActionType[] = []

    zerbgroobActions.push(
      {
        text: leader.leader_zerbgroob_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: leader.leader_zerbgroob_thumbaway_text,
        time: BASE_TIME,
      }
    )

    return zerbgroobActions
  }
}

export default ZerbandgroobStore
export const zerbgroobStore = new ZerbandgroobStore()
