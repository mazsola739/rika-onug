import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class InsomniacStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = [...gameBoardStore.playerCards]
    const shielded_players = lastJsonMessage.shielded_players || []
    const show_cards = lastJsonMessage.show_cards || []

    playerCards.forEach((playerCard) => {
      if (shielded_players.includes(playerCard.position)) {
        playerCard.shield = true
      } else {
        playerCard.shield = false
      }

      const showCard = show_cards.find((showCardObj) => {
        const [position] = Object.keys(showCardObj)

        return position === playerCard.position
      })
      if (showCard) {
        playerCard.id = (showCard as Record<string, number>)[
          playerCard.position
        ]
      } else {
        playerCard.id = 0
      }
    })

    gameBoardStore.setPlayerCards(playerCards)
  }
}

export default InsomniacStore
export const insomniacStore = new InsomniacStore()
