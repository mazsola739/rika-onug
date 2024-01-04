import { diseased, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DiseasedStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const diseasedActions: RoleActionType[] = []

    diseasedActions.push(
      {
        text: diseased.diseased_wake_text,
        time: BASE_TIME,
        image: 'onuv_diseased',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: diseased.diseased_close_text,
        time: BASE_TIME,
        image: 'onuv_diseased',
      }
    )

    return diseasedActions
  }
}

export default DiseasedStore
export const diseasedStore = new DiseasedStore()
