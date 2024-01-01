import {
  psychic,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
  identifier,
  psychicStoreKeys,
  random_psychic,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction, pickRandomKey, isCardSelectedById } =
  actionStoreUtils

class PsychicStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const psychicActions: RoleActionType[] = []

    const getRandomPsychicActionAndText = (): {
      actionText: string
      chosenText: string
    } => {
      const randomActionKey = pickRandomKey(random_psychic)
      const actionText =
        random_psychic[randomActionKey as keyof typeof random_psychic]
      const chosenKey = pickRandomKey(psychicStoreKeys)
      const chosenText = identifier[chosenKey as keyof typeof identifier]
      return { actionText, chosenText }
    }

    const {
      actionText: randomPsychicActionText,
      chosenText: chosenPsychicText,
    } = getRandomPsychicActionAndText()

    psychicActions.push(
      { text: psychic.psychic_wake_text, time: BASE_TIME },
      { text: randomPsychicActionText, time: BASE_TIME },
      { text: chosenPsychicText, time: BASE_TIME },
      generateTimedAction(ACTION_TIME),
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
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    return psychicActions
  }
}

export default PsychicStore
export const psychicStore = new PsychicStore()
