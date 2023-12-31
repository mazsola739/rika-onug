import {
  identifier,
  alienStoreAnyKeys,
  BASE_TIME,
  random_aliens,
  aliens,
  ACTION_TIME,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'
import { cowStore } from './CowStore'

//TODO oracle effect, random person for fists
//TODO shorten timer

const { generateTimedAction, isCardSelectedById, pickRandomPlayers } =
  actionStoreUtils

class AlienStore {
  constructor() {
    makeAutoObservable(this)
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

  private generateFistOutAction(): RoleActionType[] {
    const chosenIdentifierKey = actionStoreUtils.getRandomKeyFromObject(
      alienStoreAnyKeys
    ) as string
    const chosenText = this.chooseIdentifier(chosenIdentifierKey)
    return [
      { text: chosenText, time: BASE_TIME },
      { text: random_aliens.alien_newalien_text, time: BASE_TIME },
    ]
  }

  private generateViewAction(): RoleActionType[] {
    const chosenIdentifierKey = actionStoreUtils.getRandomKeyFromObject(
      alienStoreAnyKeys
    ) as string
    const chosenText = this.chooseIdentifier(chosenIdentifierKey)
    return [
      { text: random_aliens.alien_view_text, time: BASE_TIME },
      { text: chosenText, time: BASE_TIME },
    ]
  }

  private getRandomAlienActionArray = (): RoleActionType[] => {
    const randomKey = actionStoreUtils.getRandomKeyFromObject(random_aliens)

    switch (randomKey) {
      case 'alien_newalien_text':
        return this.generateFistOutAction()
      case 'alien_view_text':
      case 'alien_allview_text':
        return this.generateViewAction()
      default:
        return [{ text: random_aliens[randomKey], time: BASE_TIME }]
    }
  }

  generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []
    const randomAlienTransaction = this.getRandomAlienActionArray()

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME },
      ...randomAlienTransaction,
      generateTimedAction(ACTION_TIME),
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME }
    )

    return alienActions
  }
}

export default AlienStore
export const alienStore = new AlienStore()
