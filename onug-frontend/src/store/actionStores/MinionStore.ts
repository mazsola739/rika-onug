import { minion, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MinionStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const minionActions: RoleActionType[] = []

    minionActions.push(
      {
        text: minion.minion_wake_text,
        time: BASE_TIME,
        image: 'onuw_minion',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: minion.werewolves_thumb_away_text,
        time: BASE_TIME,
        image: 'onuw_werewolf',
      },
      {
        text: minion.minion_close_text,
        time: BASE_TIME,
        image: 'onuw_minion',
      }
    )

    return minionActions
  }
}

export default MinionStore
export const minionStore = new MinionStore()
