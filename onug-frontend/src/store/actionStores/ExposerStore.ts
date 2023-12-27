import { random_exposer, exposer, BASE_TIME, doppelganger } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { getRandomKeyFromObject, generateTimedAction, isCardSelectedById } =
  actionStoreUtils

class ExposerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const exposerActions: RoleActionType[] = []

    const randomExposerActionKey = getRandomKeyFromObject(random_exposer)
    const randomDoppelgangerActionKey = getRandomKeyFromObject(random_exposer)

    exposerActions.push(
      { text: exposer.exposer_wake_text, time: BASE_TIME },
      {
        text: random_exposer[
          randomExposerActionKey as keyof typeof random_exposer
        ],
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      { text: exposer.exposer_close_text, time: BASE_TIME }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      exposerActions.push(
        {
          text: doppelganger.doppelganger_exposer_wake_text,
          time: BASE_TIME,
        },
        {
          text: random_exposer[
            randomDoppelgangerActionKey as keyof typeof random_exposer
          ],
          time: BASE_TIME,
        },
        generateTimedAction(this.actionTime),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }
    return exposerActions
  }
}

export default ExposerStore
export const exposerStore = new ExposerStore()
