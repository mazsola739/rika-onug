import { cupid, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class CupidStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const cupidActions: RoleActionType[] = []

    cupidActions.push(
      {
        text: cupid.cupid_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(2 * ACTION_TIME),
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
