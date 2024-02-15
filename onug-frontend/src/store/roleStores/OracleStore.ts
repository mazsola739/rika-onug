import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { interactionStore } from 'store/InteractionStore'
import { WsJsonMessage, PositionProperties } from 'types'
class OracleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard
        const selectable =
          (lastJsonMessage.selectable_cards || []).includes(position) || false

        return { ...playerCard, selectable }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard
        const selectable =
          (lastJsonMessage.selectable_cards || []).includes(position) || false

        return { ...centerCard, selectable }
      }
    )

    interactionStore.selectableCenterCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_card_id: lastJsonMessage.player_card_id,
      player_original_id: lastJsonMessage.player_original_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default OracleStore
export const oracleStore = new OracleStore()
