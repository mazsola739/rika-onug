import { makeAutoObservable } from 'mobx'
import { deckStore, gamePropStore, messageStore, selectionStore } from 'store'
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
    const { hasAlphawolf, hasTemptress } = deckStore
  
    const defaultCenterCards = this.getDefaultCenterCards()
      .filter(centerCard => {
        if (centerCard.position === 'center_wolf' && !hasAlphawolf) return false
        if (centerCard.position === 'center_villain' && !hasTemptress) return false
        return true
      })
  
    this.tableCenterCards = defaultCenterCards.map(centerCard => {
      const positionObject = gamePropStore.show_cards.find(obj => obj[centerCard.position])
      const cardId = positionObject ? positionObject[centerCard.position] : null
      const card = cardId ? deckStore.getCardById(cardId) : null
  
      return {
        position: centerCard.position,
        card_name: card ? card.card_name : '',
        selectable: gamePropStore.selectable_cards.includes(centerCard.position),
      }
    })
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
      selectable_card: false,
    }))
  }

  resetScene(): void {
    this.resetCards()
    gamePropStore.reset()
    selectionStore.resetSelection()
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    this.resetCards()
    gamePropStore.reset()
    selectionStore.resetSelection()
    gamePropStore.setInteraction(lastJsonMessage?.interaction as InteractionType)
    gamePropStore.setTitle(lastJsonMessage.title)
    this.setTablePlayerCards(lastJsonMessage)
    this.setTablePlayerCard(lastJsonMessage)
    this.setTableCenterCards(lastJsonMessage)
  }

  closeYourEyes(): void {
    this.resetScene()
    messageStore.setPrivateMessage([])
    messageStore.setNarration([])
  }
}

export default RiseAndRestStore
export const riseAndRestStore = new RiseAndRestStore()
