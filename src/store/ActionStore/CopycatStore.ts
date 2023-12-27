import { BASE_TIME, copycat } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class CopycatStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const copycatActions: RoleActionType[] = []

    copycatActions.push(
      {
        text: copycat.copycat_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: copycat.copycat_close_text,
        time: BASE_TIME,
      }
    )

    return copycatActions
  }
}

export default CopycatStore
export const copycatStore = new CopycatStore()
