import { cow, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class CowStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const cowActions: RoleActionType[] = []

    cowActions.push(
      { text: cow.cow_fistout_text, time: BASE_TIME },
      generateTimedAction(ACTION_TIME),
      { text: cow.cow_fistaway_text, time: BASE_TIME }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      cowActions.push(
        { text: doppelganger.doppelganger_cow_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return cowActions
  }
}

export default CowStore
export const cowStore = new CowStore()
