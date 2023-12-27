import { BASE_TIME, doppelganger, insomniac } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class InsomniacStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      generateTimedAction(this.actionTime),
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
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return insomniacActions
  }
}

export default InsomniacStore
export const insomniacStore = new InsomniacStore()
