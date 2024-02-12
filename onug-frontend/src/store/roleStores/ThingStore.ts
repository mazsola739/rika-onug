import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { interactionStore } from 'store/InteractionStore'
import { WsJsonMessage, PositionProperties } from 'types'

class ThingStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard
        const shield =
          lastJsonMessage.shielded_players?.includes(playerCard.position) ||
          false
        const selectable =
          lastJsonMessage.selectable_cards?.includes(position) || false

        return { ...playerCard, shield, selectable }
      }
    )

    interactionStore.selectablePlayerCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default ThingStore
export const thingStore = new ThingStore()
