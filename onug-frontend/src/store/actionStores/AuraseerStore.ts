import { auraseer, doppelganger, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = utils

class AuraseerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get hasDusk(): boolean {
    return selectedDeckStore.hasDusk()
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const auraseerActions: RoleActionType[] = []

    const auraseerWakeText = this.hasDusk
      ? auraseer.auraseer_marks_wake_text
      : auraseer.auraseer_wake_text

    const doppelgangerWakeText = this.hasDusk
      ? doppelganger.doppelganger_auraseer_marks_wake_text
      : doppelganger.doppelganger_auraseer_wake_text

    auraseerActions.push(
      {
        text: auraseerWakeText,
        time: BASE_TIME,
        image: 'onub_aura_seer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: auraseer.auraseer_close_text,
        time: BASE_TIME,
        image: 'onub_aura_seer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      auraseerActions.push(
        {
          text: doppelgangerWakeText,
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

    auraseerActions.push({
      text: auraseer.auraseer_thumbsaway_text,
      time: BASE_TIME,
      image: 'onub_aura_seer',
    })

    return auraseerActions
  }
}

export default AuraseerStore
export const auraseerStore = new AuraseerStore()
