import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class MasonsStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const shield = (lastJsonMessage.shielded_players || []).includes(
          playerCard.position
        )
        const mason = (lastJsonMessage.masons || []).includes(
          playerCard.position
        )
        return { ...playerCard, shield, mason }
      }
    )

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default MasonsStore
export const masonsStore = new MasonsStore()
