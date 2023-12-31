import { copycat, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class CopycatStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const copycatActions: RoleActionType[] = []

    copycatActions.push(
      {
        text: copycat.copycat_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
