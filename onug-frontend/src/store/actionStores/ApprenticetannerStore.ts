import {
  apprenticetanner,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class ApprenticetannerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const apprenticetannerActions: RoleActionType[] = []

    apprenticetannerActions.push(
      {
        text: apprenticetanner.apprenticetanner_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
      {
        text: apprenticetanner.apprenticetanner_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      apprenticetannerActions.push(
        {
          text: doppelganger.doppelganger_apprenticetanner_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    apprenticetannerActions.push({
      text: apprenticetanner.tanner_thumbaway_text,
      time: BASE_TIME,
    })

    return apprenticetannerActions
  }
}

export default ApprenticetannerStore
export const apprenticetannerStore = new ApprenticetannerStore()
