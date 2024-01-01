import {
  empathStoreAllKeys,
  identifier,
  random_empath,
  empath,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//TODO review

const {
  generateTimedAction,
  getRandomElementFromArray,
  getRandomValueFromObject,
  isCardSelectedById,
  pickRandomPlayers,
} = actionStoreUtils

class EmpathStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const empathActions: RoleActionType[] = []

    const randomEmpathInteractionKey =
      getRandomElementFromArray(empathStoreAllKeys)
    const chosenEmpathText =
      identifier[randomEmpathInteractionKey as keyof typeof identifier] ||
      (randomEmpathInteractionKey === 'activePlayers'
        ? pickRandomPlayers(selectedDeckStore.totalPlayers, 'and')
        : randomEmpathInteractionKey)
    const randomEmpathActionText = getRandomValueFromObject(random_empath)

    // Doppelganger
    const randomDoppelgangerInteractionKey =
      getRandomElementFromArray(empathStoreAllKeys)
    const chosenDoppelgangerText =
      identifier[randomDoppelgangerInteractionKey as keyof typeof identifier] ||
      (randomDoppelgangerInteractionKey === 'activePlayers'
        ? pickRandomPlayers(selectedDeckStore.totalPlayers, 'and')
        : randomDoppelgangerInteractionKey)
    const randomDoppelgangerActionText = getRandomValueFromObject(random_empath)

    empathActions.push(
      { text: empath.empath_wake_text, time: BASE_TIME },
      { text: chosenEmpathText, time: BASE_TIME },
      { text: randomEmpathActionText, time: BASE_TIME },
      generateTimedAction(ACTION_TIME),
      { text: empath.empath_close_text, time: BASE_TIME }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      empathActions.push(
        { text: doppelganger.doppelganger_empath_wake_text, time: BASE_TIME },
        { text: chosenDoppelgangerText, time: BASE_TIME },
        { text: randomDoppelgangerActionText, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_empath_close_text, time: BASE_TIME }
      )
    }

    return empathActions
  }
}

export default EmpathStore
export const empathStore = new EmpathStore()
