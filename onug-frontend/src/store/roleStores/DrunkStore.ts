import { makeAutoObservable } from 'mobx'
import { interactionStore } from 'store'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class DrunkStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const shield =
          lastJsonMessage.shielded_players?.includes(playerCard.position) ||
          false
        return { ...playerCard, shield }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const selectable =
          lastJsonMessage.selectable_cards?.includes(centerCard.position) ||
          false
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
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default DrunkStore
export const drunkStore = new DrunkStore()
