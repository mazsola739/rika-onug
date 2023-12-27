import { BASE_TIME, minion } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class MinionStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const minionActions: RoleActionType[] = []

    minionActions.push(
      {
        text: minion.minion_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: minion.werewolves_thumb_away_text,
        time: BASE_TIME,
      },
      {
        text: minion.minion_close_text,
        time: BASE_TIME,
      }
    )

    return minionActions
  }
}

export default MinionStore
export const minionStore = new MinionStore()
