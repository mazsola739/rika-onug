import { squire, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class SquireStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const squireActions: RoleActionType[] = []

    squireActions.push(
      {
        text: squire.squire_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: squire.squire_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      squireActions.push(
        {
          text: doppelganger.doppelganger_squire_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(2 * ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    squireActions.push({
      text: squire.squire_thumbaway_text,
      time: BASE_TIME,
    })

    return squireActions
  }
}

export default SquireStore
export const squireStore = new SquireStore()
