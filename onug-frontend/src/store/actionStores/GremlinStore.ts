import { gremlin, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils, utils } from 'utils'

const { generateTimedAction } = actionStoreUtils
const { isCardSelectedById } = utils

class GremlinStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const gremlinActions: RoleActionType[] = []

    gremlinActions.push(
      {
        text: gremlin.gremlin_wake_text,
        time: BASE_TIME,
        image: 'onuv_gremlin',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: gremlin.gremlin_close_text,
        time: BASE_TIME,
        image: 'onuv_gremlin',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      gremlinActions.push(
        {
          text: doppelganger.doppelganger_gremlin_wake_text,
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

    return gremlinActions
  }
}

export default GremlinStore
export const gremlinStore = new GremlinStore()
