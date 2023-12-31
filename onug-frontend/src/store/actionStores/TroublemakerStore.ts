import { troublemaker, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class TroublemakerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const troublemakerActions: RoleActionType[] = []

    troublemakerActions.push(
      {
        text: troublemaker.troublemaker_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
