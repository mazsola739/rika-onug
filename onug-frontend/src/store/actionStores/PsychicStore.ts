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
import { actionStoreUtils, utils } from 'utils'

const { generateTimedAction, pickRandomElementFromArray, isCardSelectedById } =
  actionStoreUtils
const { pickRandomKey } = utils

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
      randomIdentifierValue: string
    } => {
      const randomActionKey = pickRandomKey(random_psychic)
      const actionText =
        random_psychic[randomActionKey as keyof typeof random_psychic]
      const randomIdentifierKey = pickRandomElementFromArray(psychicStoreKeys)
      const randomIdentifierValue =
        identifier[randomIdentifierKey as keyof typeof identifier]

      return { actionText, randomIdentifierValue }
    }

    const {
      actionText: randomPsychicActionText,
      randomIdentifierValue: chosenPsychicText,
    } = getRandomPsychicActionAndText()

    psychicActions.push(
      {
        text: psychic.psychic_wake_text,
        time: BASE_TIME,
        image: 'onua_psychic',
      },
      { text: randomPsychicActionText, time: BASE_TIME, image: 'onua_psychic' },
      { text: chosenPsychicText, time: BASE_TIME, image: 'onua_psychic' },
      generateTimedAction(ACTION_TIME),
      {
        text: psychic.psychic_close_text,
        time: BASE_TIME,
        image: 'onua_psychic',
      }
    )

    // Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      const {
        actionText: randomDoppelgangerActionText,
        randomIdentifierValue: chosenDoppelgangerText,
      } = getRandomPsychicActionAndText()
      psychicActions.push(
        {
          text: doppelganger.doppelganger_psychic_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: randomDoppelgangerActionText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: chosenDoppelgangerText,
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

    return psychicActions
  }
}

export default PsychicStore
export const psychicStore = new PsychicStore()
