import { thing, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ThingStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const thingActions: RoleActionType[] = []

    thingActions.push(
      {
        text: thing.thing_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: thing.thing_close_text,
        time: BASE_TIME,
      }
    )

    return thingActions
  }
}

export default ThingStore
export const thingStore = new ThingStore()
