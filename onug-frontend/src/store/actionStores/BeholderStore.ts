import { beholder, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class BeholderStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const beholderActions: RoleActionType[] = []

    // Only ID 9 is active
    if (
      isCardSelectedById(this.deck, 9) &&
      !isCardSelectedById(this.deck, 18)
    ) {
      beholderActions.push(
        { text: beholder.beholder_seer_wake_text, time: BASE_TIME },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          },
          {
            text: doppelganger.doppelganger_beholder_seer_wake_text,
            time: BASE_TIME,
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_seer_thumbaway_text,
            time: BASE_TIME,
          },
          { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_seer_thumbaway_text,
            time: BASE_TIME,
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          }
        )
      }
    }

    // Only ID 18 is active
    if (
      isCardSelectedById(this.deck, 18) &&
      !isCardSelectedById(this.deck, 9)
    ) {
      beholderActions.push(
        { text: beholder.beholder_apprenticeseer_wake_text, time: BASE_TIME },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          },
          {
            text: doppelganger.doppelganger_beholder_apprenticeseer_wake_text,
            time: BASE_TIME,
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
          },
          { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          }
        )
      }
    }

    // Both ID 9 and ID 18 are active
    if (isCardSelectedById(this.deck, 9) && isCardSelectedById(this.deck, 18)) {
      beholderActions.push(
        {
          text: beholder.beholder_seer_apprenticeseer_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          },
          {
            text: doppelganger.doppelganger_beholder_seer_apprenticeseer_wake_text,
            time: BASE_TIME,
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_seer_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
          },
          { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_seer_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
          }
        )
      }
    }

    return beholderActions
  }
}

export default BeholderStore
export const beholderStore = new BeholderStore()
