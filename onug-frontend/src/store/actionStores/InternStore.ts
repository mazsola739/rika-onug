import { BASE_TIME, intern } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class InternStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const internActions: RoleActionType[] = []

    if (isCardSelectedById(this.deck, 63)) {
      internActions.push(
        { text: intern.intern_wake_1_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
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
