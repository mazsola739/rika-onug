import { wolfIds, werewolves, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils, utils } from 'utils'

const { generateTimedAction } = actionStoreUtils
const { isCardSelectedById } = utils

class WerewolfStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  countWolvesInGame(): number {
    return this.deck.reduce(
      (count, card) => (wolfIds.includes(card.id) ? count + 1 : count),
      0
    )
  }

  generateActions(): RoleActionType[] {
    const werewolfActions: RoleActionType[] = []
    const isDreamWolfInDeck = isCardSelectedById(this.deck, 21)

    const werewolfWakeText = isDreamWolfInDeck
      ? werewolves.dreamwolf_wake_text
      : werewolves.werewolves_wake_text

    werewolfActions.push({
      text: werewolfWakeText,
      time: BASE_TIME,
      image: 'onuw_werewolf',
    })

    if (this.countWolvesInGame() <= 4) {
      werewolfActions.push(
        {
          text: werewolves.werewolves_lonewolf_text,
          time: BASE_TIME,
          image: 'onuw_werewolf',
        },
        generateTimedAction(ACTION_TIME)
      )
    }

    if (isDreamWolfInDeck) {
      werewolfActions.push({
        text: werewolves.dreamwolf_close_text,
        time: BASE_TIME,
        image: 'onud_dream_wolf',
      })
    }

    werewolfActions.push({
      text: werewolves.werewolves_close_text,
      time: BASE_TIME,
      image: 'onuw_werewolf',
    })

    return werewolfActions
  }
}

export default WerewolfStore
export const werewolfStore = new WerewolfStore()
