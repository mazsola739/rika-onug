import { apprenticeseer, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ApprenticeseerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const apprenticeseerActions: RoleActionType[] = []

    apprenticeseerActions.push(
      {
        text: apprenticeseer.apprenticeseer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: apprenticeseer.apprenticeseer_close_text,
        time: BASE_TIME,
      }
    )

    return apprenticeseerActions
  }
}

export default ApprenticeseerStore
export const apprenticeseerStore = new ApprenticeseerStore()
