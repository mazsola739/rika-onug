import {
  random_rascal,
  rascal,
  BASE_TIME,
  rascalStoreAnyTwoKeys,
  rascalStoreAnyOneKeys,
  identifier,
  ACTION_TIME,
  doppelganger,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils, utils } from 'utils'

const { generateTimedAction, isCardSelectedById } = actionStoreUtils
const { pickRandomKey } = utils
//TODO review

class RascalStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const rascalActions: RoleActionType[] = []

    const randomRascalActionKey = pickRandomKey(random_rascal)

    const randomDoppelgangerActionKey = pickRandomKey(random_rascal)

    rascalActions.push(
      { text: rascal.rascal_wake_text, time: BASE_TIME, image: 'onua_rascal' },
      {
        text: random_rascal[
          randomRascalActionKey as keyof typeof random_rascal
        ],
        time: BASE_TIME,
        image: 'onua_rascal',
      }
    )

    if (randomRascalActionKey !== 'rascal_idiot_text') {
      let identifierKeys: string[] = []
      let endText: string

      if (randomRascalActionKey === 'rascal_troublemaker_text') {
        identifierKeys = rascalStoreAnyTwoKeys
      } else {
        identifierKeys = rascalStoreAnyOneKeys
        endText =
          rascal[
            `rascal_${
              randomRascalActionKey.split('_')[1]
            }end_text` as keyof typeof rascal
          ]
      }

      const selectedIdentifierKey =
        identifierKeys[Math.floor(Math.random() * identifierKeys.length)]
      const selectedIdentifierValue =
        identifier[selectedIdentifierKey as keyof typeof identifier]
      rascalActions.push({
        text: selectedIdentifierValue,
        time: BASE_TIME,
        image: 'onua_rascal',
      })

      if (endText) {
        rascalActions.push({
          text: endText,
          time: BASE_TIME,
          image: 'onua_rascal',
        })
      }
    }

    rascalActions.push(generateTimedAction(ACTION_TIME), {
      text: rascal.rascal_close_text,
      time: BASE_TIME,
      image: 'onua_rascal',
    })

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      rascalActions.push(
        {
          text: doppelganger.doppelganger_rascal_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: random_rascal[
            randomDoppelgangerActionKey as keyof typeof random_rascal
          ],
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    if (randomDoppelgangerActionKey !== 'rascal_idiot_text') {
      let identifierKeys: string[] = []
      let endText: string

      if (randomDoppelgangerActionKey === 'rascal_troublemaker_text') {
        identifierKeys = rascalStoreAnyTwoKeys
      } else {
        identifierKeys = rascalStoreAnyOneKeys
        endText =
          rascal[
            `rascal_${
              randomDoppelgangerActionKey.split('_')[1]
            }end_text` as keyof typeof rascal
          ]
      }

      const selectedIdentifierKey =
        identifierKeys[Math.floor(Math.random() * identifierKeys.length)]
      const selectedIdentifierValue =
        identifier[selectedIdentifierKey as keyof typeof identifier]
      rascalActions.push({
        text: selectedIdentifierValue,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })

      if (endText) {
        rascalActions.push({
          text: endText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        })
      }
    }

    if (isCardSelectedById(this.deck, 1)) {
      rascalActions.push(generateTimedAction(ACTION_TIME), {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })
    }

    return rascalActions
  }
}

export default RascalStore
export const rascalStore = new RascalStore()
