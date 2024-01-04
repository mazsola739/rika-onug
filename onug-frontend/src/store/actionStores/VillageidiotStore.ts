import { villageidiot, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class VillageidiotStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const villageidiotActions: RoleActionType[] = []

    villageidiotActions.push(
      {
        text: villageidiot.villageidiot_wake_text,
        time: BASE_TIME,
        image: 'onud_village_idiot',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: villageidiot.villageidiot_close_text,
        time: BASE_TIME,
        image: 'onud_village_idiot',
      }
    )

    return villageidiotActions
  }
}

export default VillageidiotStore
export const villageidiotStore = new VillageidiotStore()
