import { mirrorman, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

class MirrormanStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const mirrormanActions: RoleActionType[] = []

    mirrormanActions.push(
      {
        text: mirrorman.mirrorman_wake_text,
        time: BASE_TIME,
        image: 'onus_mirror_man',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: mirrorman.mirrorman_close_text,
        time: BASE_TIME,
        image: 'onus_mirror_man',
      }
    )

    return mirrormanActions
  }
}

export default MirrormanStore
export const mirrormanStore = new MirrormanStore()
