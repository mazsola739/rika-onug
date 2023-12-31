import { evilometer, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class EvilometerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const evilometerActions: RoleActionType[] = []

    evilometerActions.push(
      {
        text: evilometer.evilometer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: evilometer.evilometer_close_text,
        time: BASE_TIME,
      }
    )

    return evilometerActions
  }
}

export default EvilometerStore
export const evilometerStore = new EvilometerStore()
