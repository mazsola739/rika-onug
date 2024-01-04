import { groobzerb, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class GroobzerbStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const groobzerbActions: RoleActionType[] = []

    groobzerbActions.push(
      {
        text: groobzerb.groobzerb_wake_text,
        time: BASE_TIME,
        image: 'onua_groob_alien',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: groobzerb.groobzerb_close_text,
        time: BASE_TIME,
        image: 'onua_groob_alien',
      }
    )

    return groobzerbActions
  }
}

export default GroobzerbStore
export const groobzerbStore = new GroobzerbStore()
