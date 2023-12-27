import { BASE_TIME, mysticwolf } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MysticwolfStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const mysticwolfActions: RoleActionType[] = []

    mysticwolfActions.push(
      {
        text: mysticwolf.mysticwolf_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: mysticwolf.mysticwolf_close_text,
        time: BASE_TIME,
      }
    )

    return mysticwolfActions
  }
}

export default MysticwolfStore
export const mysticwolfStore = new MysticwolfStore()
