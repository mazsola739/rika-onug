import { makeAutoObservable } from 'mobx'
import { interactionStore } from 'store'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class SeerStore {
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
          lastJsonMessage.selectable_player_cards?.includes(position) || false
        const showCard = lastJsonMessage.show_cards?.find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? (showCard as Record<string, number>)[position] : 0

        return { ...playerCard, shield, selectable, id }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const selectable =
          lastJsonMessage.selectable_center_cards?.includes(
            centerCard.position
          ) || false
        const showCard = lastJsonMessage.show_cards?.find(
          (showCardObj) => centerCard.position in showCardObj
        )
        const id = showCard ? showCard[centerCard.position] : centerCard.id

        return { ...centerCard, selectable, id }
      }
    )

    interactionStore.selectablePlayerCardLimit = 1
    interactionStore.selectableCenterCardLimit = 2
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_card_id: lastJsonMessage.player_card_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default SeerStore
export const seerStore = new SeerStore()
