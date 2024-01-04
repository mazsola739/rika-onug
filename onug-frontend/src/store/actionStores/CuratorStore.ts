import { curator, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class CuratorStore {
  constructor() {
    makeAutoObservable(this)
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
        image: 'onud_curator',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: curator.curator_close_text,
        time: BASE_TIME,
        image: 'onud_curator',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      curatorActions.push(
        {
          text: doppelganger.doppelganger_curator_wake_text,
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

    return curatorActions
  }
}

export default CuratorStore
export const curatorStore = new CuratorStore()
