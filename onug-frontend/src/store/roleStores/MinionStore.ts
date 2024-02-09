import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class MinionStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = [...gameBoardStore.playerCards]
    const shielded_players = lastJsonMessage.shielded_players || []
    const werewolves = lastJsonMessage.werewolves || []

    playerCards.forEach((playerCard) => {
      if (shielded_players.includes(playerCard.position)) {
        playerCard.shield = true
      } else {
        playerCard.shield = false
      }

      playerCard.werewolf = werewolves.includes(playerCard.position)
    })

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default MinionStore
export const minionStore = new MinionStore()
