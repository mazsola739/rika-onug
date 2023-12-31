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

const { generateTimedAction, isCardSelectedById, pickRandomPlayers } =
  actionStoreUtils

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
      empathStoreAllKeys[Math.floor(Math.random() * empathStoreAllKeys.length)]
    let chosenEmpathText =
      randomEmpathInteractionKey === 'activePlayers'
        ? pickRandomPlayers(selectedDeckStore.totalPlayers, 'and')
        : randomEmpathInteractionKey

    chosenEmpathText =
      identifier[chosenEmpathText as keyof typeof identifier] ||
      chosenEmpathText

    const randomEmpathActionKey =
      Object.keys(random_empath)[
        Math.floor(Math.random() * Object.keys(random_empath).length)
      ]
    const randomEmpathActionText =
      random_empath[randomEmpathActionKey as keyof typeof random_empath]

    const randomDoppelgangerInteractionKey =
      empathStoreAllKeys[Math.floor(Math.random() * empathStoreAllKeys.length)]
    let chosenDoppelgangerText =
      randomDoppelgangerInteractionKey === 'activePlayers'
        ? pickRandomPlayers(selectedDeckStore.totalPlayers, 'and')
        : randomDoppelgangerInteractionKey

    chosenDoppelgangerText =
      identifier[chosenDoppelgangerText as keyof typeof identifier] ||
      chosenDoppelgangerText

    const randomDoppelgangerActionKey =
      Object.keys(random_empath)[
        Math.floor(Math.random() * Object.keys(random_empath).length)
      ]
    const randomDoppelgangerActionText =
      random_empath[randomDoppelgangerActionKey as keyof typeof random_empath]

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
