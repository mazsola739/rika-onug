import { BASE_TIME, curator, doppelganger } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class CuratorStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const curatorActions: RoleActionType[] = []

    curatorActions.push(
      {
        text: curator.curator_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: curator.curator_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      curatorActions.push(
        {
          text: doppelganger.doppelganger_curator_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return curatorActions
  }
}

export default CuratorStore
export const curatorStore = new CuratorStore()
