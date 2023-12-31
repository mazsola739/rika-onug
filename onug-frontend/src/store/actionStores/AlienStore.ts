import {
  random_aliens,
  aliens,
  identifier,
  alienStoreAnyKeys,
  BASE_TIME,
} from 'constant'
import { ActionCardType, RoleActionType } from 'types'
import { cowStore } from './CowStore'
import { actionStoreUtils } from 'utils'
import { selectedDeckStore } from 'store'

//TODO oracle effect

const { generateTimedAction, isCardSelectedById, pickRandomPlayers } =
  actionStoreUtils

class AlienStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  private chooseIdentifier(chosenIdentifierKey: string): string {
    const chosenIdentifierText =
      identifier[chosenIdentifierKey as keyof typeof identifier]

    if (chosenIdentifierKey === 'activePlayers') {
      const totalPlayers = selectedDeckStore.totalPlayers
      return pickRandomPlayers(totalPlayers, 'or')
    }

    return chosenIdentifierText
  }

  private getRandomAlienActionArray = (): RoleActionType[] => {
    const randomKey = actionStoreUtils.getRandomKeyFromObject(random_aliens)
    const randomKeyValue = random_aliens[randomKey]

    const randomKeyAsString = randomKeyValue as string

    if (randomKeyAsString.startsWith('put a fist out.')) {
      const chosenIdentifierKey = actionStoreUtils.getRandomKeyFromObject(
        alienStoreAnyKeys
      ) as string
      const chosenText = this.chooseIdentifier(chosenIdentifierKey)

      return [
        { text: chosenText, time: BASE_TIME },
        { text: randomKeyAsString, time: BASE_TIME },
      ]
    }

    if (randomKeyAsString.includes('view')) {
      const chosenIdentifierKey = actionStoreUtils.getRandomKeyFromObject(
        alienStoreAnyKeys
      ) as string
      const chosenText = this.chooseIdentifier(chosenIdentifierKey)

      return [
        { text: randomKeyAsString, time: BASE_TIME },
        { text: chosenText, time: BASE_TIME },
      ]
    }

    return [{ text: randomKeyAsString, time: BASE_TIME }]
  }

  generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []
    const randomAlienTransaction = this.getRandomAlienActionArray()

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
