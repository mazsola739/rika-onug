import { masons, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MasonStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const masonActions: RoleActionType[] = []

    masonActions.push(
      {
        text: masons.mason_wake_text,
        time: BASE_TIME,
        image: 'onuw_mason',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: masons.mason_close_text,
        time: BASE_TIME,
        image: 'onuw_mason',
      }
    )

    return masonActions
  }
}

export default MasonStore
export const masonStore = new MasonStore()
