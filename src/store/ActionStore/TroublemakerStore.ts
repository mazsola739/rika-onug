import { BASE_TIME, troublemaker } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class TroublemakerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const troublemakerActions: RoleActionType[] = []

    troublemakerActions.push(
      {
        text: troublemaker.troublemaker_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: troublemaker.troublemaker_close_text,
        time: BASE_TIME,
      }
    )

    return troublemakerActions
  }
}

export default TroublemakerStore
export const troublemakerStore = new TroublemakerStore()
