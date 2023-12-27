import { BASE_TIME, auraseer, doppelganger } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils

class AuraseerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      },
      generateTimedAction(this.actionTime),
      {
        text: auraseer.auraseer_close_text,
        time: BASE_TIME,
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      auraseerActions.push(
        {
          text: doppelgangerWakeText,
          time: BASE_TIME,
        },
        generateTimedAction(this.actionTime),

        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    auraseerActions.push({
      text: auraseer.auraseer_thumbsaway_text,
      time: BASE_TIME,
    })

    return auraseerActions
  }
}

export default AuraseerStore
export const auraseerStore = new AuraseerStore()
