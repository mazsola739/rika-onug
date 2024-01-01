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
import { selectedDeckStore } from 'store/SelectedDeckStore'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { pickRandomKey, generateTimedAction, isCardSelectedById } =
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

    const getRandomMorticianKey = () =>
      morticianStoreAllKeys[
        Math.floor(Math.random() * morticianStoreAllKeys.length)
      ]

    const chosenMorticianKey = getRandomMorticianKey()
    const chosenMorticianText =
      identifier[chosenMorticianKey as keyof typeof identifier]

    const pushAction = (actionText: string, extraActionText?: string) => {
      morticiansActions.push({ text: actionText, time: BASE_TIME })
      if (extraActionText) {
        morticiansActions.push({ text: extraActionText, time: BASE_TIME })
      }
    }

    morticiansActions.push({
      text: mortician.mortician_wake_text,
      time: BASE_TIME,
    })

    const randomMorticianActionKey = pickRandomKey(random_mortician)
    switch (randomMorticianActionKey) {
      case 'mortician_1card_text':
        pushAction(
          random_mortician[randomMorticianActionKey],
          chosenMorticianText
        )
        break
      case 'mortician_2cards_text':
        pushAction(
          random_mortician[randomMorticianActionKey],
          identifier.identifier_bothneighbors_text
        )
        break
      case 'mortician_pretend_text':
        pushAction(random_mortician[randomMorticianActionKey])
        break
    }

    morticiansActions.push(generateTimedAction(ACTION_TIME), {
      text: mortician.mortician_close_text,
      time: BASE_TIME,
    })

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      const randomDoppelgangerActionKey =
        pickRandomKey(random_mortician)
      switch (randomDoppelgangerActionKey) {
        case 'mortician_1card_text':
          pushAction(
            random_mortician[randomDoppelgangerActionKey],
            chosenMorticianText
          )
          break
        case 'mortician_2cards_text':
          pushAction(
            random_mortician[randomDoppelgangerActionKey],
            identifier.identifier_bothneighbors_text
          )
          break
        case 'mortician_pretend_text':
          pushAction(random_mortician[randomDoppelgangerActionKey])
          break
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
