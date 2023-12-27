import {
  random_aliens,
  aliens,
  identifier,
  alienStoreAllKeys,
  alienStoreAnyKeys,
  BASE_TIME,
} from 'constant'
import { ActionCardType, RoleActionType } from 'types'
import { cowStore } from './CowStore'
import { actionStoreUtils } from 'utils'
import { selectedDeckStore } from 'store'

const { isCardSelectedById, generateTimedAction, pickRandomPlayers } =
  actionStoreUtils

class AlienStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  chooseIdentifier(chosenIdentifierKey: string): string {
    const chosenIdentifierText =
      identifier[chosenIdentifierKey as keyof typeof identifier]
    if (chosenIdentifierKey === 'activePlayers') {
      const totalPlayers = selectedDeckStore.totalPlayers
      return pickRandomPlayers(totalPlayers, 'or')
    }
    return chosenIdentifierText
  }

  generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []

    const getRandomAlienActionArray = <T>(
      obj: T,
      anyKeys: string[],
      allKeys: string[]
    ): RoleActionType[] => {
      const keys = Object.keys(obj) as (keyof T)[]
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      const randomKeyValue = obj[randomKey as keyof typeof obj]

      if ((randomKeyValue as string).startsWith('put a fist out.')) {
        const chosenIdentifierKey =
          allKeys[Math.floor(Math.random() * allKeys.length)]
        const chosenText = this.chooseIdentifier(chosenIdentifierKey)
        return [
          { text: chosenText, time: BASE_TIME },
          { text: randomKeyValue as string, time: BASE_TIME },
        ]
      }

      if ((randomKeyValue as string).includes('view')) {
        const chosenIdentifierKey =
          anyKeys[Math.floor(Math.random() * anyKeys.length)]
        const chosenText = this.chooseIdentifier(chosenIdentifierKey)
        return [
          { text: randomKeyValue as string, time: BASE_TIME },
          { text: chosenText, time: BASE_TIME },
        ]
      }

      return [{ text: randomKeyValue as string, time: BASE_TIME }]
    }

    const randomAlienTransaction = getRandomAlienActionArray(
      random_aliens,
      alienStoreAnyKeys,
      alienStoreAllKeys
    )

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME },
      ...randomAlienTransaction,
      generateTimedAction(this.actionTime),
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME }
    )

    return alienActions
  }
}

export default AlienStore
export const alienStore = new AlienStore()
