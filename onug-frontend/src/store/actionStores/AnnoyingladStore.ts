import { BASE_TIME, annoyinglad } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class AnnoyingladStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const annoyingladActions: RoleActionType[] = []

    annoyingladActions.push(
      {
        text: annoyinglad.annoyinglad_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: annoyinglad.annoyinglad_close_text,
        time: BASE_TIME,
      }
    )

    return annoyingladActions
  }
}

export default AnnoyingladStore
export const annoyingladStore = new AnnoyingladStore()
