import { renfield, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = utils

class RenfieldStore {
  constructor() {
    makeAutoObservable(this)
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
        image: 'onuv_renfield',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: renfield.renfield_close_text,
        time: BASE_TIME,
        image: 'onuv_renfield',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      renfieldActions.push(
        {
          text: doppelganger.doppelganger_renfield_wake_text,
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

    renfieldActions.push({
      text: renfield.renfield_vampires_close_text,
      time: BASE_TIME,
      image: 'onuv_vampire',
    })

    return renfieldActions
  }
}

export default RenfieldStore
export const renfieldStore = new RenfieldStore()
