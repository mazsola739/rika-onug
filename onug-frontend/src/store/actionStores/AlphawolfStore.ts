import { BASE_TIME, alphawolf } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class AlphawolfStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const alphawolfActions: RoleActionType[] = []

    alphawolfActions.push(
      {
        text: alphawolf.alphawolf_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: alphawolf.alphawolf_close_text,
        time: BASE_TIME,
      }
    )

    return alphawolfActions
  }
}

export default AlphawolfStore
export const alphawolfStore = new AlphawolfStore()
