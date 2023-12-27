import { BASE_TIME, groobzerb } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class GroobzerbStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const groobzerbActions: RoleActionType[] = []

    groobzerbActions.push(
      {
        text: groobzerb.groobzerb_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: groobzerb.groobzerb_close_text,
        time: BASE_TIME,
      }
    )

    return groobzerbActions
  }
}

export default GroobzerbStore
export const groobzerbStore = new GroobzerbStore()
