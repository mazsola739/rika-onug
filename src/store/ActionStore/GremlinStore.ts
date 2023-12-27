import { BASE_TIME, doppelganger, gremlin } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class GremlinStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      },
      generateTimedAction(this.actionTime),
      {
        text: gremlin.gremlin_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      gremlinActions.push(
        { text: doppelganger.doppelganger_gremlin_wake_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return gremlinActions
  }
}

export default GremlinStore
export const gremlinStore = new GremlinStore()
