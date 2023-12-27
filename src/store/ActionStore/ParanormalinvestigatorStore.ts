import { BASE_TIME, paranormalinvestigator } from 'constant'
import { selectedDeckStore } from 'store'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ParanormalinvestigatorStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get hasDusk(): boolean {
    return selectedDeckStore.hasDusk()
  }

  generateActions(): RoleActionType[] {
    const paranormalinvestigatorActions: RoleActionType[] = []

    paranormalinvestigatorActions.push(
      {
        text: this.hasDusk
          ? paranormalinvestigator.paranormalinvestigator_duskwake_text
          : paranormalinvestigator.paranormalinvestigator_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: paranormalinvestigator.paranormalinvestigator_close_text,
        time: BASE_TIME,
      }
    )

    return paranormalinvestigatorActions
  }
}

export default ParanormalinvestigatorStore
export const paranormalinvestigatorStore = new ParanormalinvestigatorStore()
