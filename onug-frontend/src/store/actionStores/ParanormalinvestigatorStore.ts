import { paranormalinvestigator, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class ParanormalinvestigatorStore {
  constructor() {
    makeAutoObservable(this)
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
        image: 'onud_paranormal_investigator',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: paranormalinvestigator.paranormalinvestigator_close_text,
        time: BASE_TIME,
        image: 'onud_paranormal_investigator',
      }
    )

    return paranormalinvestigatorActions
  }
}

export default ParanormalinvestigatorStore
export const paranormalinvestigatorStore = new ParanormalinvestigatorStore()
