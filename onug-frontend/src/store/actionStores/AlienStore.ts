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
  generateTimedAction,
  isCardSelectedById,
  pickRandomElementFromArray,
  pickRandomKey,
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
    const chosenAlienActions: RoleActionType[] = []

    const chosenAlienActionKey = pickRandomKey(random_aliens)

    if (chosenAlienActionKey.includes('view')) {
      const identifierKey = pickRandomElementFromArray(alienStoreAnyKeys)
      const playerText: string =
        identifierKey === 'activePlayers'
          ? pickRandomPlayers(this.totalPlayers, 'or')
          : identifier[identifierKey]

      chosenAlienActions.push(
        { text: random_aliens[chosenAlienActionKey], time: BASE_TIME },
        { text: playerText, time: BASE_TIME }
      )
    } else if (
      chosenAlienActionKey.includes('newalien') ||
      chosenAlienActionKey.includes('alienhelper')
    ) {
      const playerKey = pickRandomElementFromArray(alienStoreAllKeys)
      const playerText: string = identifier[playerKey]

      chosenAlienActions.push(
        { text: playerText, time: BASE_TIME },
        { text: random_aliens[chosenAlienActionKey], time: BASE_TIME }
      )
    } else {
      chosenAlienActions.push({
        text: random_aliens[chosenAlienActionKey],
        time: BASE_TIME,
      })
    }

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME },
      ...chosenAlienActions,
      generateTimedAction(ACTION_TIME),
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME }
    )

    return alienActions
  }
}

export default AlienStore
export const alienStore = new AlienStore()
