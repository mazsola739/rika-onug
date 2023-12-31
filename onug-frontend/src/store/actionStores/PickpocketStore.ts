import { pickpocket, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class PickpocketStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const pickpocketActions: RoleActionType[] = []

    pickpocketActions.push(
      {
        text: pickpocket.pickpocket_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: pickpocket.pickpocket_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      pickpocketActions.push(
        {
          text: doppelganger.doppelganger_pickpocket_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return pickpocketActions
  }
}

export default PickpocketStore
export const pickpocketStore = new PickpocketStore()
