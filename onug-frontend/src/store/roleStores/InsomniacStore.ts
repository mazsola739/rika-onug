import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class InsomniacStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const shield =
          (lastJsonMessage.shielded_players || []).includes(
            playerCard.position
          ) || false
        const showCard = (lastJsonMessage.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === playerCard.position
        )
        const id = showCard ? (showCard[playerCard.position] as number) : 0
        return { ...playerCard, shield, id }
      }
    )

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

export default InsomniacStore
export const insomniacStore = new InsomniacStore()
