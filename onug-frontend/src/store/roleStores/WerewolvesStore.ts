import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class WerewolvesStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = [...gameBoardStore.playerCards]
    const shielded_players = lastJsonMessage.shielded_players || []
    const selectable_cards = lastJsonMessage.selectable_cards || []
    const werewolves = lastJsonMessage.werewolves || []

    playerCards.forEach((playerCard) => {
      if (shielded_players.includes(playerCard.position)) {
        playerCard.shield = true
      } else {
        playerCard.shield = false
      }

      playerCard.werewolf = werewolves.includes(playerCard.position)
    })

    const centerCards: PositionProperties[] = [...gameBoardStore.centerCards]

    centerCards.forEach((centerCard) => {
      if (selectable_cards.includes(centerCard.position)) {
        centerCard.selectable = true
      } else {
        centerCard.selectable = false
      }
    })

    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
  }
}

export default WerewolvesStore
export const werewolvesStore = new WerewolvesStore()
