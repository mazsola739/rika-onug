import {
  apprenticetanner,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = utils

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
        image: 'onub_apprentice_tanner',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: apprenticetanner.apprenticetanner_close_text,
        time: BASE_TIME,
        image: 'onub_apprentice_tanner',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      apprenticetannerActions.push(
        {
          text: doppelganger.doppelganger_apprenticetanner_wake_text,
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

    apprenticetannerActions.push({
      text: apprenticetanner.tanner_thumbaway_text,
      time: BASE_TIME,
      image: 'onuw_tanner',
    })

    return apprenticetannerActions
  }
}

export default ApprenticetannerStore
export const apprenticetannerStore = new ApprenticetannerStore()
