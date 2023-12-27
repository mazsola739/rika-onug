import { BASE_TIME, werewolves, wolfIds } from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { formatActionTimeText, isCardSelectedById } = actionStoreUtils

class WerewolfStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
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

    werewolfActions.push({ text: werewolfWakeText, time: BASE_TIME })

    if (this.countWolvesInGame() <= 4) {
      werewolfActions.push(
        { text: werewolves.werewolves_lonewolf_text, time: BASE_TIME },
        { text: formatActionTimeText(this.actionTime), time: this.actionTime }
      )
    }

    if (isDreamWolfInDeck) {
      werewolfActions.push({
        text: werewolves.dreamwolf_close_text,
        time: BASE_TIME,
      })
    }

    werewolfActions.push({
      text: werewolves.werewolves_close_text,
      time: BASE_TIME,
    })

    return werewolfActions
  }
}

export default WerewolfStore
export const werewolfStore = new WerewolfStore()
