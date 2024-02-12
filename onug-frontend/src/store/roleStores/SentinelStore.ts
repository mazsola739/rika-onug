import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { interactionStore } from 'store/InteractionStore'
import { WsJsonMessage, PositionProperties } from 'types'

class SentinelStore {
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
        selectable: (lastJsonMessage.selectable_cards || []).includes(
          playerCard.position
        ),
        shielded: (lastJsonMessage.shielded_card || []).includes(
          playerCard.position
        ),
      })
    )

    interactionStore.selectablePlayerCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default SentinelStore
export const sentinelStore = new SentinelStore()
