import { mysticwolf, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MysticwolfStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const mysticwolfActions: RoleActionType[] = []

    mysticwolfActions.push(
      {
        text: mysticwolf.mysticwolf_wake_text,
        time: BASE_TIME,
        image: 'onud_mystic_wolf',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: mysticwolf.mysticwolf_close_text,
        time: BASE_TIME,
        image: 'onud_mystic_wolf',
      }
    )

    return mysticwolfActions
  }
}

export default MysticwolfStore
export const mysticwolfStore = new MysticwolfStore()
