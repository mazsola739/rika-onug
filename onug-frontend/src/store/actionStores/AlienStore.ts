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
import { actionStoreUtils, utils } from 'utils'
import { cowStore } from './CowStore'

//TODO oracle effect
//TODO shorten timer

const {
  generateTimedAction,
  pickRandomElementFromArray,
  pickRandomUpTo3Players,
} = actionStoreUtils
const { isCardSelectedById, pickRandomKey } = utils

class AlienStore {
  isNewAlienOrHelper = false

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
          ? pickRandomUpTo3Players(this.totalPlayers, 'or')
          : identifier[identifierKey]

      chosenAlienActions.push(
        {
          text: random_aliens[chosenAlienActionKey],
          time: BASE_TIME,
          image: 'onua_alien',
        },
        { text: playerText, time: BASE_TIME, image: 'onua_alien' }
      )
    } else if (
      chosenAlienActionKey.includes('newalien') ||
      chosenAlienActionKey.includes('alienhelper')
    ) {
      this.isNewAlienOrHelper = true
      const playerKey = pickRandomElementFromArray(alienStoreAllKeys)
      const playerText: string = identifier[playerKey]

      chosenAlienActions.push(
        { text: playerText, time: BASE_TIME, image: 'onua_alien' },
        {
          text: random_aliens[chosenAlienActionKey],
          time: BASE_TIME,
          image: 'onua_alien',
        }
      )
    } else {
      chosenAlienActions.push({
        text: random_aliens[chosenAlienActionKey],
        time: BASE_TIME,
        image: 'onua_alien',
      })
    }

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME, image: 'onua_alien' },
      ...chosenAlienActions,

      generateTimedAction(ACTION_TIME)
    )
    this.isNewAlienOrHelper &&
      alienActions.push({
        text: aliens.alien_fistaway_text,
        time: BASE_TIME,
        image: 'onua_alien',
      })
    alienActions.push(
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME, image: 'onua_alien' }
    )

    return alienActions
  }
}

export default AlienStore
export const alienStore = new AlienStore()
