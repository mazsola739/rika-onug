import { BASE_TIME, cow, doppelganger } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class CowStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const cowActions: RoleActionType[] = []

    cowActions.push(
      { text: cow.cow_fistout_text, time: BASE_TIME },
      generateTimedAction(this.actionTime),
      { text: cow.cow_fistaway_text, time: BASE_TIME }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      cowActions.push(
        { text: doppelganger.doppelganger_cow_wake_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return cowActions
  }
}

export default CowStore
export const cowStore = new CowStore()
