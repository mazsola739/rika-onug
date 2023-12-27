import { BASE_TIME, vampires } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class VampireStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const vampireActions: RoleActionType[] = []

    const isRenfielInDeck = isCardSelectedById(this.deck, 21)
    const vampireCloseText = isRenfielInDeck
      ? vampires.vampire_renfield_close_text
      : vampires.vampire_close_text

    vampireActions.push(
      {
        text: vampires.vampire_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: vampireCloseText,
        time: BASE_TIME,
      }
    )

    return vampireActions
  }
}

export default VampireStore
export const vampireStore = new VampireStore()
