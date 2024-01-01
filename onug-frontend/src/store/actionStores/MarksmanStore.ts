import { marksman, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class MarksmanStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const marksmanActions: RoleActionType[] = []

    marksmanActions.push(
      {
        text: marksman.marksman_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: marksman.marksman_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      marksmanActions.push(
        { text: doppelganger.doppelganger_marksman_wake_text, time: BASE_TIME },
        generateTimedAction(2 * ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return marksmanActions
  }
}

export default MarksmanStore
export const marksmanStore = new MarksmanStore()
