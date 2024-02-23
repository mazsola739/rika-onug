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
        const selectable_cards =
          (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false

        return { ...playerCard, selectable_cards }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard
        const selectable_cards =
          (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false

        return { ...centerCard, selectable_cards }
      }
    )

    interactionStore.selectableCenterCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.interaction?.player_name,
      player_number: lastJsonMessage.interaction?.player_number,
      player_original_id: lastJsonMessage.interaction?.player_original_id,
      player_card_id: lastJsonMessage.interaction?.player_card_id,
      player_role: lastJsonMessage.interaction?.player_role,
      player_role_id: lastJsonMessage.interaction?.player_role_id,
      player_team: lastJsonMessage.interaction?.player_team,
      player_mark: lastJsonMessage.interaction?.player_mark,
    })
  }
}

export default OracleStore
export const oracleStore = new OracleStore()
