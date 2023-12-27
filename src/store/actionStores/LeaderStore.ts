import { BASE_TIME, doppelganger, leader } from 'constant'
import { ActionCardType, RoleActionType } from 'types'
import { zerbgroobStore } from './ZerbandgroobStore'
import { selectedDeckStore } from 'store'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, areAllCardsSelectedById, isCardSelectedById } =
  actionStoreUtils

class LeaderStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const leaderActions: RoleActionType[] = []

    leaderActions.push(
      {
        text: leader.leader_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),

      ...(areAllCardsSelectedById(this.deck, [47, 54])
        ? zerbgroobStore.generateActions()
        : []),
      {
        text: leader.leader_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      leaderActions.push(
        { text: doppelganger.doppelganger_leader_wake_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        areAllCardsSelectedById(this.deck, [47, 54]) && {
          text: doppelganger.doppelganger_leader_zerbgroob_text,
          time: BASE_TIME,
        },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return leaderActions
  }
}

export default LeaderStore
export const leaderStore = new LeaderStore()
