import { BASE_TIME, doppelganger, priest } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class PriestStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const priestActions: RoleActionType[] = []

    priestActions.push(
      {
        text: priest.priest_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: priest.priest_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      priestActions.push(
        { text: doppelganger.doppelganger_priest_wake_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return priestActions
  }
}

export default PriestStore
export const priestStore = new PriestStore()
