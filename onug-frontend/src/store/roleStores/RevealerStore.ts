import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { interactionStore } from 'store/InteractionStore'
import { WsJsonMessage, PositionProperties } from 'types'

class RevealerStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard
        const shield =
          lastJsonMessage.shielded_players?.includes(position) || false
        const selectable =
          lastJsonMessage.selectable_cards?.includes(position) || false

        const showCard = lastJsonMessage.show_cards?.find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const flippedCard = lastJsonMessage.flipped_cards?.find(
          (flippedCardObj) => Object.keys(flippedCardObj)[0] === position
        )

        const showCardId = showCard?.[position] ?? 0
        const flippedCardId = flippedCard?.[position] ?? 0

        const id = showCardId || flippedCardId

        return { ...playerCard, shield, selectable, id }
      }
    )

    interactionStore.selectablePlayerCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_original_id: lastJsonMessage.player_original_id,
      player_card_id: lastJsonMessage.player_card_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default RevealerStore
export const revealerStore = new RevealerStore()
