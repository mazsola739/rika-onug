import { BASE_TIME, apprenticetanner, doppelganger } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class ApprenticetannerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      generateTimedAction(this.actionTime),
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
        generateTimedAction(this.actionTime),
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
