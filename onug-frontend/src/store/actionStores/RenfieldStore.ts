import { BASE_TIME, doppelganger, renfield } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class RenfieldStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const renfieldActions: RoleActionType[] = []

    renfieldActions.push(
      {
        text: renfield.renfield_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: renfield.renfield_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      renfieldActions.push(
        { text: doppelganger.doppelganger_renfield_wake_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    renfieldActions.push({
      text: renfield.renfield_vampires_close_text,
      time: BASE_TIME,
    })

    return renfieldActions
  }
}

export default RenfieldStore
export const renfieldStore = new RenfieldStore()
