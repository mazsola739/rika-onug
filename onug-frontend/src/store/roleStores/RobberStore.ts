import { makeAutoObservable } from 'mobx'
import { interactionStore } from 'store'
import { gameBoardStore } from 'store/GameBoardStore'
import { PositionProperties, WsJsonMessage } from 'types'

class RobberStore {
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
        const id = showCard ? (showCard as Record<string, number>)[position] : 0

        return { ...playerCard, shield, selectable, id }
      }
    )

    interactionStore.selectablePlayerCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
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

export default RobberStore
export const robberStore = new RobberStore()
