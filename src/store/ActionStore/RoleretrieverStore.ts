import { BASE_TIME, roleretriever } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class RoleretrieverStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const roleretrieverActions: RoleActionType[] = []

    roleretrieverActions.push(
      {
        text: roleretriever.roleretriever_wake_1_text,
        time: BASE_TIME,
      },
      {
        text: roleretriever.roleretriever_wake_2_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: roleretriever.roleretriever_close_text,
        time: BASE_TIME,
      }
    )

    return roleretrieverActions
  }
}

export default RoleretrieverStore
export const roleretrieverStore = new RoleretrieverStore()
