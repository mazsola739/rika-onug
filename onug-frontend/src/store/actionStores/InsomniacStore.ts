import { insomniac, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class InsomniacStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const insomniacActions: RoleActionType[] = []

    insomniacActions.push(
      {
        text: insomniac.insomniac_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: insomniac.insomniac_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      insomniacActions.push(
        {
          text: doppelganger.doppelganger_insomniac_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return insomniacActions
  }
}

export default InsomniacStore
export const insomniacStore = new InsomniacStore()
