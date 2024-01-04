import { vampires, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class VampireStore {
  constructor() {
    makeAutoObservable(this)
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
        image: 'onuv_vampire',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: vampireCloseText,
        time: BASE_TIME,
        image: 'onuv_vampire',
      }
    )

    return vampireActions
  }
}

export default VampireStore
export const vampireStore = new VampireStore()
