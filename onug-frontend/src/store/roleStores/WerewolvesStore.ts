import { makeAutoObservable } from 'mobx'
import { interactionStore } from 'store'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class WerewolvesStore {
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

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const selectable =
          lastJsonMessage.selectable_cards?.includes(centerCard.position) ||
          false
        const showCard = lastJsonMessage.show_cards?.find(
          (showCardObj) => centerCard.position in showCardObj
        )
        const id = showCard ? showCard[centerCard.position] : centerCard.id
        return { ...centerCard, selectable, id }
      }
    )

    interactionStore.selectableCenterCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
  }
}

export default WerewolvesStore
export const werewolvesStore = new WerewolvesStore()
