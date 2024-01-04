import { witch, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class WitchStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const witchActions: RoleActionType[] = []

    witchActions.push(
      {
        text: witch.witch_wake_text,
        time: BASE_TIME,
        image: 'onud_witch',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: witch.witch_close_text,
        time: BASE_TIME,
        image: 'onud_witch',
      }
    )

    return witchActions
  }
}

export default WitchStore
export const witchStore = new WitchStore()
