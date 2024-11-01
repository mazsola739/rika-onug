import { makeAutoObservable } from 'mobx'
import { deckStore, gamePropStore, messageStore } from 'store'
import { CardPosition, InteractionType, TableCenterCard, TablePlayerCard, WsJsonMessage } from 'types'

class RiseAndRestStore {
  tablePlayerCard: TablePlayerCard = {}
  tablePlayerCards: TablePlayerCard[] = []
  tableCenterCards: TableCenterCard[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getDefaultPlayerCards(): TablePlayerCard[] {
    return Array.from({ length: deckStore.totalPlayers }, (_, i) => ({
      player_name: '',
      position: `player_${i + 1}` as CardPosition,
      card_name: '',
      mark: '',
      artifact: false,
      shield: false,
      selectable_card: false,
      selectable_mark: false,
      werewolves: false,
      dreamwolf: false,
    }))
  }

  getDefaultCenterCards(): TableCenterCard[] {
    const positions: CardPosition[] = ['center_wolf', 'center_left', 'center_middle', 'center_right', 'center_villain']
    return positions.map(position => ({
      position,
      card_name: '',
      selectable: false,
    }))
  }  

  getCardStatus(position: CardPosition) {
    return {
      selectable_card: gamePropStore.selectable_cards.includes(position),
      selectable_mark: gamePropStore.selectable_marks.includes(position),
      artifact: gamePropStore.artifacted_cards.includes(position),
      shield: gamePropStore.shielded_cards.includes(position),
      werewolves: gamePropStore.werewolves.includes(position),
      dreamwolf: gamePropStore.dreamwolf.includes(position),
    }
  }

  setTablePlayerCards(lastJsonMessage: WsJsonMessage): void {
    const players = lastJsonMessage.players
    const defaultPlayerCards = this.getDefaultPlayerCards()

    this.tablePlayerCards = defaultPlayerCards.map(defaultCard => {
      const playerCard = players.find(player => defaultCard.position === player.player_number)
      if (!playerCard) return defaultCard

      const card = deckStore.getCardById(playerCard.player_card_id)
      
      return {
        ...defaultCard,
        player_name: playerCard.player_name,
        card_name: card ? card.card_name : '',
        ...this.getCardStatus(defaultCard.position),
      }
    })
  }

  setTablePlayerCard(lastJsonMessage: WsJsonMessage): void {
    const player = lastJsonMessage.player
    const card = deckStore.getCardById(player.player_card_id)
    this.tablePlayerCard = {
      player_name: 'You',
      position: player.player_number,
      card_name: card ? card.card_name : '',
      mark: player.player_mark || '',
      ...this.getCardStatus(player.player_number),
    }
  }

  setTableCenterCards(lastJsonMessage: WsJsonMessage): void {
    this.tableCenterCards = this.getDefaultCenterCards().map(centerCard => {
      const positionObject = gamePropStore.show_cards.find(obj => obj[centerCard.position])
      const cardId = positionObject ? positionObject[centerCard.position] : null
      const card = cardId ? deckStore.getCardById(cardId) : null

      return {
        ...centerCard,
        card_name: card ? card.card_name : '',
        selectable_card: gamePropStore.selectable_cards.includes(centerCard.position),
      }
    })
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    gamePropStore.setInteraction(lastJsonMessage?.interaction as InteractionType)
    gamePropStore.setTitle(lastJsonMessage.title)
    this.setTablePlayerCards(lastJsonMessage)
    this.setTablePlayerCard(lastJsonMessage)
    this.setTableCenterCards(lastJsonMessage)
  }

  resetCards(): void {
    const resetCardState = {
      player_name: '',
      card_name: '',
      mark: '',
      artifact: false,
      shield: false,
      selectable_card: false,
      selectable_mark: false,
      werewolves: false,
      dreamwolf: false,
    }

    this.tablePlayerCard = { ...resetCardState, position: this.tablePlayerCard.position }
    this.tablePlayerCards = this.tablePlayerCards.map(card => ({ ...resetCardState, position: card.position }))
    this.tableCenterCards = this.tableCenterCards.map(centerCard => ({
      ...centerCard,
      card_name: '',
      selectable: false,
    }))
  }

  closeYourEyes(): void {
    this.resetCards()
    messageStore.setPrivateMessage([])
    messageStore.setNarration([])
    gamePropStore.reset()
  }
}

export default RiseAndRestStore
export const riseAndRestStore = new RiseAndRestStore()
