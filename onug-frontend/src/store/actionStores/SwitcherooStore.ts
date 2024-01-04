import { switcheroo, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class SwitcherooStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const switcherooActions: RoleActionType[] = []

    switcherooActions.push(
      {
        text: switcheroo.switcheroo_wake_text,
        time: BASE_TIME,
        image: 'onus_switcheroo',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: switcheroo.switcheroo_close_text,
        time: BASE_TIME,
        image: 'onus_switcheroo',
      }
    )

    return switcherooActions
  }
}

export default SwitcherooStore
export const switcherooStore = new SwitcherooStore()
