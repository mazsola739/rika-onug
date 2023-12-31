import {
  random_mortician,
  morticianStoreAllKeys,
  identifier,
  mortician,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { getRandomKeyFromObject, generateTimedAction, isCardSelectedById } =
  actionStoreUtils

class MorticianStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const morticiansActions: RoleActionType[] = []

    const randomMorticianActionKey = getRandomKeyFromObject(random_mortician)
    const randomMorticianActionText =
      random_mortician[
        randomMorticianActionKey as keyof typeof random_mortician
      ]

    const chosenMorticianKey =
      morticianStoreAllKeys[
        Math.floor(Math.random() * morticianStoreAllKeys.length)
      ]
    const chosenMorticianText =
      identifier[chosenMorticianKey as keyof typeof identifier]

    const randomDoppelgangerActionKey = getRandomKeyFromObject(random_mortician)
    const randomDoppelgangerActionText =
      random_mortician[
        randomDoppelgangerActionKey as keyof typeof random_mortician
      ]

    const chosenDoppelgangerKey =
      morticianStoreAllKeys[
        Math.floor(Math.random() * morticianStoreAllKeys.length)
      ]
    const chosenDoppelgangerText =
      identifier[chosenDoppelgangerKey as keyof typeof identifier]

    morticiansActions.push({
      text: mortician.mortician_wake_text,
      time: BASE_TIME,
    })

    if (randomMorticianActionKey === 'mortician_1card_text') {
      morticiansActions.push(
        { text: randomMorticianActionText, time: BASE_TIME },
        { text: chosenMorticianText, time: BASE_TIME }
      )
    } else if (randomMorticianActionKey === 'mortician_2cards_text') {
      morticiansActions.push(
        { text: randomMorticianActionText, time: BASE_TIME },
        { text: identifier.identifier_bothneighbors_text, time: BASE_TIME }
      )
    } else if (randomMorticianActionKey === 'mortician_pretend_text') {
      morticiansActions.push({
        text: randomMorticianActionText,
        time: BASE_TIME,
      })
    }

    morticiansActions.push(generateTimedAction(ACTION_TIME), {
      text: mortician.mortician_close_text,
      time: BASE_TIME,
    })

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      morticiansActions.push({
        text: doppelganger.doppelganger_mortician_wake_text,
        time: BASE_TIME,
      })

      if (randomDoppelgangerActionKey === 'mortician_1card_text') {
        morticiansActions.push(
          { text: randomDoppelgangerActionText, time: BASE_TIME },
          { text: chosenDoppelgangerText, time: BASE_TIME }
        )
      } else if (randomDoppelgangerActionKey === 'mortician_2cards_text') {
        morticiansActions.push(
          { text: randomDoppelgangerActionText, time: BASE_TIME },
          { text: identifier.identifier_bothneighbors_text, time: BASE_TIME }
        )
      } else if (randomDoppelgangerActionKey === 'mortician_pretend_text') {
        morticiansActions.push({
          text: randomDoppelgangerActionText,
          time: BASE_TIME,
        })
      }

      morticiansActions.push(generateTimedAction(ACTION_TIME), {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
      })
    }

    return morticiansActions
  }
}

export default MorticianStore
export const morticiansStore = new MorticianStore()
