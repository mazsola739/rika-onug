import { BASE_TIME, cupid } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class CupidStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const cupidActions: RoleActionType[] = []

    cupidActions.push(
      {
        text: cupid.cupid_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: cupid.cupid_close_text,
        time: BASE_TIME,
      }
    )

    return cupidActions
  }
}

export default CupidStore
export const cupidStore = new CupidStore()
