import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class MasonsStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = [...gameBoardStore.playerCards]
    const shielded_players = lastJsonMessage.shielded_players || []
    const masons = lastJsonMessage.masons || []

    playerCards.forEach((playerCard) => {
      if (shielded_players.includes(playerCard.position)) {
        playerCard.shield = true
      } else {
        playerCard.shield = false
      }

      playerCard.mason = masons.includes(playerCard.position)
    })

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default MasonsStore
export const masonsStore = new MasonsStore()
