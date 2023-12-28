import { BASE_TIME, doppelganger, psychic } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const {
  generateTimedAction,
  getRandomPsychicActionAndText,
  isCardSelectedById,
} = actionStoreUtils

class PsychicStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const psychicActions: RoleActionType[] = []

    const {
      actionText: randomPsychicActionText,
      chosenText: chosenPsychicText,
    } = getRandomPsychicActionAndText()

    psychicActions.push(
      { text: psychic.psychic_wake_text, time: BASE_TIME },
      { text: randomPsychicActionText, time: BASE_TIME },
      { text: chosenPsychicText, time: BASE_TIME },
      generateTimedAction(this.actionTime),
      { text: psychic.psychic_close_text, time: BASE_TIME }
    )

    // Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      const {
        actionText: randomDoppelgangerActionText,
        chosenText: chosenDoppelgangerText,
      } = getRandomPsychicActionAndText()
      psychicActions.push(
        { text: doppelganger.doppelganger_psychic_wake_text, time: BASE_TIME },
        { text: randomDoppelgangerActionText, time: BASE_TIME },
        { text: chosenDoppelgangerText, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return psychicActions
  }
}

export default PsychicStore
export const psychicStore = new PsychicStore()
