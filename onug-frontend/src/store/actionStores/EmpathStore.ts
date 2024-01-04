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
  getRandomValueFromObject,
  isCardSelectedById,
  pickRandomElementFromArray,
  pickRandomUpTo3Players,
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
      pickRandomElementFromArray(empathStoreAllKeys)
    const chosenEmpathText =
      identifier[randomEmpathInteractionKey as keyof typeof identifier] ||
      (randomEmpathInteractionKey === 'activePlayers'
        ? pickRandomUpTo3Players(selectedDeckStore.totalPlayers, 'and')
        : randomEmpathInteractionKey)
    const randomEmpathActionText = getRandomValueFromObject(random_empath)

    // Doppelganger
    const randomDoppelgangerInteractionKey =
      pickRandomElementFromArray(empathStoreAllKeys)
    const chosenDoppelgangerText =
      identifier[randomDoppelgangerInteractionKey as keyof typeof identifier] ||
      (randomDoppelgangerInteractionKey === 'activePlayers'
        ? pickRandomUpTo3Players(selectedDeckStore.totalPlayers, 'and')
        : randomDoppelgangerInteractionKey)
    const randomDoppelgangerActionText = getRandomValueFromObject(random_empath)

    empathActions.push(
      { text: empath.empath_wake_text, time: BASE_TIME, image: 'onub_empath' },
      { text: chosenEmpathText, time: BASE_TIME, image: 'onub_empath' },
      { text: randomEmpathActionText, time: BASE_TIME, image: 'onub_empath' },
      generateTimedAction(ACTION_TIME),
      { text: empath.empath_close_text, time: BASE_TIME, image: 'onub_empath' }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      empathActions.push(
        {
          text: doppelganger.doppelganger_empath_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: chosenDoppelgangerText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: randomDoppelgangerActionText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_empath_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return empathActions
  }
}

export default EmpathStore
export const empathStore = new EmpathStore()
