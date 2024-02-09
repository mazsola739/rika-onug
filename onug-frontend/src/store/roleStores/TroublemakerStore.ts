import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class TroublemakerStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        return {
          ...playerCard,
          shield:
            lastJsonMessage.shielded_players?.includes(playerCard.position) ||
            false,
          selectable:
            lastJsonMessage.selectable_cards?.includes(playerCard.position) ||
            false,
        }
      }
    )

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default TroublemakerStore
export const troublemakerStore = new TroublemakerStore()
