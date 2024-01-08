import { priest, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = utils

class PriestStore {
  constructor() {
    makeAutoObservable(this)
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
        image: 'onuv_priest',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: priest.priest_close_text,
        time: BASE_TIME,
        image: 'onuv_priest',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      priestActions.push(
        {
          text: doppelganger.doppelganger_priest_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(2 * ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return priestActions
  }
}

export default PriestStore
export const priestStore = new PriestStore()
