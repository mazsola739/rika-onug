import { BASE_TIME, villageidiot } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class VillageidiotStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const villageidiotActions: RoleActionType[] = []

    villageidiotActions.push(
      {
        text: villageidiot.villageidiot_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: villageidiot.villageidiot_close_text,
        time: BASE_TIME,
      }
    )

    return villageidiotActions
  }
}

export default VillageidiotStore
export const villageidiotStore = new VillageidiotStore()
