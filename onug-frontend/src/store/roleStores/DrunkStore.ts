import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class DrunkStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = [...gameBoardStore.playerCards]
    const shielded_players = lastJsonMessage.shielded_players || []
    const selectable_cards = lastJsonMessage.selectable_cards || []

    playerCards.forEach((playerCard) => {
      if (shielded_players.includes(playerCard.position)) {
        playerCard.shield = true
      } else {
        playerCard.shield = false
      }
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
    const player_card_id = lastJsonMessage.player_card_id || 0

    if (player_card_id && player_card_id === 0)
      return gameBoardStore.setKnownPlayer(lastJsonMessage)
  }
}

export default DrunkStore
export const drunkStore = new DrunkStore()
