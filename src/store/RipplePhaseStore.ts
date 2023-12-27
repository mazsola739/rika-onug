import { BASE_TIME, leader } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'

class RipplePhaseStore {
  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const rippleActions: RoleActionType[] = []

    rippleActions.push(
      {
        text: leader.leader_zerbgroob_text,
        time: BASE_TIME,
      },
      {
        text: leader.leader_zerbgroob_thumbaway_text,
        time: BASE_TIME,
      }
    )

    return rippleActions
  }
}

export default RipplePhaseStore
export const ripplePhaseStore = new RipplePhaseStore()
