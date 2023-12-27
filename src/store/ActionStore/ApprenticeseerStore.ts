import { BASE_TIME, apprenticeseer } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ApprenticeseerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const apprenticeseerActions: RoleActionType[] = []

    apprenticeseerActions.push(
      {
        text: apprenticeseer.apprenticeseer_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
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
