import { roleretriever, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class RoleretrieverStore {
  constructor() {
    makeAutoObservable(this)
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
      generateTimedAction(ACTION_TIME),
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
