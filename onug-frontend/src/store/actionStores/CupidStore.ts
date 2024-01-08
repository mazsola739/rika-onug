import { cupid, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

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
        image: 'onuv_cupid',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: cupid.cupid_close_text,
        time: BASE_TIME,
        image: 'onuv_cupid',
      }
    )

    return cupidActions
  }
}

export default CupidStore
export const cupidStore = new CupidStore()
