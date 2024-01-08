import { pickpocket, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = utils

class PickpocketStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const pickpocketActions: RoleActionType[] = []

    pickpocketActions.push(
      {
        text: pickpocket.pickpocket_wake_text,
        time: BASE_TIME,
        image: 'onuv_pickpocket',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: pickpocket.pickpocket_close_text,
        time: BASE_TIME,
        image: 'onuv_pickpocket',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      pickpocketActions.push(
        {
          text: doppelganger.doppelganger_pickpocket_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return pickpocketActions
  }
}

export default PickpocketStore
export const pickpocketStore = new PickpocketStore()
