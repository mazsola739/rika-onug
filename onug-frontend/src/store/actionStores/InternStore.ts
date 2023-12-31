import { intern, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class InternStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const internActions: RoleActionType[] = []

    if (isCardSelectedById(this.deck, 63)) {
      internActions.push(
        { text: intern.intern_wake_1_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: intern.intern_wake_2_text, time: BASE_TIME }
      )
    } else {
      internActions.push({
        text: intern.intern_wake_alone_text,
        time: BASE_TIME,
      })
    }

    internActions.push({
      text: intern.intern_close_text,
      time: BASE_TIME,
    })

    return internActions
  }
}

export default InternStore
export const internStore = new InternStore()
