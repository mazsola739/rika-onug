import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class MinionStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => ({
        ...playerCard,
        shield: (lastJsonMessage.shielded_players || []).includes(
          playerCard.position
        ),
        werewolf: (lastJsonMessage.werewolves || []).includes(
          playerCard.position
        ),
      })
    )

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default MinionStore
export const minionStore = new MinionStore()
