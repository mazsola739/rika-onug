import {
  random_exposer,
  exposer,
  BASE_TIME,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils, utils } from 'utils'

const { getRandomValueFromObject } = actionStoreUtils
const { generateTimedAction, isCardSelectedById } = utils

class ExposerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const exposerActions: RoleActionType[] = []

    const randomExposerAction = getRandomValueFromObject(random_exposer)
    const randomDoppelgangerAction = getRandomValueFromObject(random_exposer)

    exposerActions.push(
      {
        text: exposer.exposer_wake_text,
        time: BASE_TIME,
        image: 'onua_exposer',
      },
      {
        text: randomExposerAction,
        time: BASE_TIME,
        image: 'onua_exposer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: exposer.exposer_close_text,
        time: BASE_TIME,
        image: 'onua_exposer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      exposerActions.push(
        {
          text: doppelganger.doppelganger_exposer_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: randomDoppelgangerAction,
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
    return exposerActions
  }
}

export default ExposerStore
export const exposerStore = new ExposerStore()
