import { BASE_TIME, instigator } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class InstigatorStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const instigatorActions: RoleActionType[] = []

    instigatorActions.push(
      {
        text: instigator.instigator_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
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
