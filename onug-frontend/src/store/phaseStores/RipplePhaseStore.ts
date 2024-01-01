import { BASE_TIME, random_ripp, ripple, ripples } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//TODO

const { pickRandomKey } = actionStoreUtils
const {
  random_ripple_1minute,
  random_ripple_repeat,
  random_ripple_repeat1p,
  random_ripple_insomniac,
  random_ripple_nospeak,
  random_ripple_faceaway,
  random_ripple_troublemaker,
  random_ripple_steal,
  random_ripple_witch,
  random_ripple_view1,
  random_ripple_view2,
  random_ripple_reveal,
  random_ripple_dualview,
  random_ripple_twovote,
  random_ripple_shuffle,
  random_ripple_drunk,
  random_ripple_none,
  random_ripple_voteapp,
  random_ripple_repeatrole,
  random_ripple_iamalien,
} = ripples

class RipplePhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const rippleActions: RoleActionType[] = []

    const randomActionKey = pickRandomKey(random_ripp)

    console.log(randomActionKey)

    rippleActions.push({
      text: ripple.ripple_intro_text,
      time: BASE_TIME,
    })

    return rippleActions
  }
}

export default RipplePhaseStore
export const ripplePhaseStore = new RipplePhaseStore()
