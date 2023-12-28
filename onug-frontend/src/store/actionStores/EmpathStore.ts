import {
  empath,
  empathStoreAllKeys,
  random_empath,
  identifier,
  BASE_TIME,
  doppelganger,
} from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//TODO review

const { generateTimedAction, isCardSelectedById, pickRandomPlayers } =
  actionStoreUtils

class EmpathStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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
      generateTimedAction(this.actionTime),
      { text: empath.empath_close_text, time: BASE_TIME }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      empathActions.push(
        { text: doppelganger.doppelganger_empath_wake_text, time: BASE_TIME },
        { text: chosenDoppelgangerText, time: BASE_TIME },
        { text: randomDoppelgangerActionText, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_empath_close_text, time: BASE_TIME }
      )
    }

    return empathActions
  }
}

export default EmpathStore
export const empathStore = new EmpathStore()
