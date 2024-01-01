import {
  identifier,
  alienStoreAnyKeys,
  BASE_TIME,
  random_aliens,
  aliens,
  ACTION_TIME,
  alienStoreAllKeys,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'
import { cowStore } from './CowStore'

//TODO oracle effect
//TODO shorten timer

const {
  getRandomElementFromArray,
  getRandomKeyFromObject,
  generateTimedAction,
  isCardSelectedById,
  pickRandomPlayers,
} = actionStoreUtils

class AlienStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  get totalPlayers(): number {
    return selectedDeckStore.totalPlayers
  }

  generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []
    const randomAlienActions: RoleActionType[] = []
    const randomActionKey = getRandomKeyFromObject(random_aliens)

    if (randomActionKey.includes('view')) {
      const playerIdentifierKey = getRandomElementFromArray(alienStoreAnyKeys)
      const playerIdentifierText: string =
        playerIdentifierKey === 'activePlayers'
          ? pickRandomPlayers(this.totalPlayers, 'or')
          : identifier[playerIdentifierKey]

      randomAlienActions.push(
        { text: random_aliens[randomActionKey], time: BASE_TIME },
        { text: playerIdentifierText, time: BASE_TIME }
      )
    } else if (
      randomActionKey.includes('newalien') ||
      randomActionKey.includes('alienhelper')
    ) {
      const playerIdentifierKey = getRandomElementFromArray(alienStoreAllKeys)
      const playerIdentifierText: string = identifier[playerIdentifierKey]

      randomAlienActions.push(
        { text: playerIdentifierText, time: BASE_TIME },
        { text: random_aliens[randomActionKey], time: BASE_TIME }
      )
    } else {
      randomAlienActions.push({
        text: random_aliens[randomActionKey],
        time: BASE_TIME,
      })
    }

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME },
      ...randomAlienActions,
      generateTimedAction(ACTION_TIME),
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME }
    )

    return alienActions
  }
}

export default AlienStore
export const alienStore = new AlienStore()
