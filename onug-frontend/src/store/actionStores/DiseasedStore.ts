import { BASE_TIME, diseased } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DiseasedStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const diseasedActions: RoleActionType[] = []

    diseasedActions.push(
      {
        text: diseased.diseased_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: diseased.diseased_close_text,
        time: BASE_TIME,
      }
    )

    return diseasedActions
  }
}

export default DiseasedStore
export const diseasedStore = new DiseasedStore()
