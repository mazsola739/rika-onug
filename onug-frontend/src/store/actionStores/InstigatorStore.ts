import { instigator, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class InstigatorStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const instigatorActions: RoleActionType[] = []

    instigatorActions.push(
      {
        text: instigator.instigator_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: instigator.instigator_close_text,
        time: BASE_TIME,
      }
    )

    return instigatorActions
  }
}

export default InstigatorStore
export const instigatorStore = new InstigatorStore()
