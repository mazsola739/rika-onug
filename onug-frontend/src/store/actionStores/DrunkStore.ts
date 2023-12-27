import { BASE_TIME, drunk } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DrunkStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const drunkActions: RoleActionType[] = []

    drunkActions.push(
      {
        text: drunk.drunk_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: drunk.drunk_close_text,
        time: BASE_TIME,
      }
    )

    return drunkActions
  }
}

export default DrunkStore
export const drunkStore = new DrunkStore()
