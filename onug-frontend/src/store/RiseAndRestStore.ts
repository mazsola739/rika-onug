import { makeAutoObservable } from 'mobx'
import { deckStore, gamePropStore, messageStore } from 'store'
import { CardPosition, InteractionType, TableCenterCard, TablePlayerCard, WsJsonMessage } from 'types'

class RiseAndRestStore {
  tablePlayerCard: TablePlayerCard = {}
  tablePlayerCards: TableCenterCard[] = []
  tableCenterCards: TableCenterCard[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setTablePlayerCards(lastJsonMessage: WsJsonMessage): void {
    const defaultTablePlayerCards: TablePlayerCard[] = []

    for (let i = 1; i <= deckStore.totalPlayers; i++) {
      defaultTablePlayerCards.push({
        player_name: '',
        position: `player_${i}` as CardPosition,
        card_name: '',
        mark: '',
        artifact: false,
        shield: false,
        selectable: false,
      })
    }

    const players = lastJsonMessage.players

    const updatedTablePlayerCards = defaultTablePlayerCards.map(defaultTablePlayerCard => {
      const playerCard = players.find(player => defaultTablePlayerCard.position === player.player_number)

      if (playerCard) {
        const card = deckStore.getCardById(playerCard.player_card_id)
        return {
          ...defaultTablePlayerCard,
          player_name: playerCard.player_name,
          card_name: card ? card.card_name : '',
        }
      }

      return defaultTablePlayerCard
    })

    this.tablePlayerCards = updatedTablePlayerCards
  }

  setTablePlayerCard(lastJsonMessage: WsJsonMessage): void {
    const player = lastJsonMessage.player
    const card = deckStore.getCardById(player.player_card_id)

    const tablePlayerCard: TablePlayerCard = {
      player_name: 'You',
      position: `player_${player.player_number}` as CardPosition,
      card_name: card ? card.card_name : '',
      mark: 'mark_of_clarity',
      artifact: false,
      shield: false,
      selectable: false,
    }
    this.tablePlayerCard = tablePlayerCard
  }

  setTableCenterCards(lastJsonMessage: WsJsonMessage): void {
    const defaultTableCenterCards: TableCenterCard[] = [
      {
        position: 'center_wolf',
        card_name: '',
        selectable: false,
      },
      {
        position: 'center_left',
        card_name: '',
        selectable: false,
      },
      {
        position: 'center_middle',
        card_name: '',
        selectable: false,
      },
      {
        position: 'center_right',
        card_name: '',
        selectable: false,
      },
      {
        position: 'center_villain',
        card_name: '',
        selectable: false,
      },
    ]

    const updatedTableCenterCards = defaultTableCenterCards.map(centerCard => {
      const positionObject = gamePropStore.show_cards.find(obj => obj[centerCard.position])
      const id = positionObject ? positionObject[centerCard.position] : null
      const card = id ? deckStore.getCardById(id) : null

      const updatedCard = {
        ...centerCard,
        card_name: card ? card.card_name : '',
        selectable: gamePropStore.selectable_cards.includes(centerCard.position),
      }

      return updatedCard
    })

    this.tableCenterCards = updatedTableCenterCards
  }


  openYourEyes(interaction: InteractionType): void {
    gamePropStore.setInteraction(interaction)
  }


  closeYourEyes(): void {
    messageStore.setPrivateMessage([])
    messageStore.setNarration([])
  }
}

export default RiseAndRestStore
export const riseAndRestStore = new RiseAndRestStore()
