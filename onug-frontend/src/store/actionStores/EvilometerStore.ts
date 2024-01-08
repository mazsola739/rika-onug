import { evilometer, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

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
        image: 'onus_evilometer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: evilometer.evilometer_close_text,
        time: BASE_TIME,
        image: 'onus_evilometer',
      }
    )

    return evilometerActions
  }
}

export default EvilometerStore
export const evilometerStore = new EvilometerStore()
