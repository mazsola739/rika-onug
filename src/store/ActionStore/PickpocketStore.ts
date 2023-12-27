import { BASE_TIME, doppelganger, pickpocket } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class PickpocketStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      generateTimedAction(this.actionTime),
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
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return pickpocketActions
  }
}

export default PickpocketStore
export const pickpocketStore = new PickpocketStore()
