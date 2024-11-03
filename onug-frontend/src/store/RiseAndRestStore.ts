import { makeAutoObservable } from 'mobx'
import { deckStore, gamePropStore, messageStore, selectionStore } from 'store'
import { CardPosition, InteractionType, TableCenterCard, TablePlayerCard, WsJsonMessage } from 'types'
import { getCardById } from 'utils'

class RiseAndRestStore {
  tablePlayerCard: TablePlayerCard = {}
  tablePlayerCards: TablePlayerCard[] = []
  tableCenterCards: TableCenterCard[] = []

  constructor() {
    makeAutoObservable(this)
  }

  createEmptyPlayerCard(position: CardPosition): TablePlayerCard {
    return {
      player_name: '',
      position,
      card_name: '',
      mark: '',
      role: '',
      team: '',
      artifact: false,
      shield: false,
      selectable_card: false,
      selectable_mark: false,
      werewolves: false,
      dreamwolf: false,
    }
  }

  createDefaultCenterCards(): TableCenterCard[] {
    const positions: CardPosition[] = ['center_wolf', 'center_left', 'center_middle', 'center_right', 'center_villain']
    const { hasAlphawolf, hasTemptress } = deckStore

    return positions
      .filter(pos => !(pos === 'center_wolf' && !hasAlphawolf || pos === 'center_villain' && !hasTemptress))
      .map(pos => ({ position: pos, card_name: '', selectable: false }))
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
    this.tablePlayerCards = Array.from({ length: deckStore.totalPlayers }, (_, i) => {
      const position = `player_${i + 1}` as CardPosition
      const defaultCard = this.createEmptyPlayerCard(position)

      const playerCard = players.find(player => position === player.player_number)
      if (!playerCard) return defaultCard

      const card = getCardById(playerCard.player_card_id)
      return {
        ...defaultCard,
        player_name: playerCard.player_name,
        card_name: card ? card.card_name : '',
        mark: playerCard.player_mark || '',
        role: playerCard.player_role || '',
        team: playerCard.player_team || '',
        ...this.getCardStatus(position),
      }
    })
  }

  setTablePlayerCard(lastJsonMessage: WsJsonMessage): void {
    const player = lastJsonMessage.player
    const card = getCardById(player.player_card_id)
    this.tablePlayerCard = {
      player_name: 'You',
      position: player.player_number,
      card_name: card ? card.card_name : '',
      mark: player.player_mark || '',
      role: player.player_role || '',
      team: player.player_team || '',
      ...this.getCardStatus(player.player_number),
    }
  }

  setTableCenterCards(lastJsonMessage: WsJsonMessage): void {
    this.tableCenterCards = this.createDefaultCenterCards().map(centerCard => {
      const positionObject = gamePropStore.show_cards.find(obj => obj[centerCard.position])
      const cardId = positionObject ? positionObject[centerCard.position] : null
      const card = cardId ? getCardById(cardId) : null

      return {
        ...centerCard,
        card_name: card ? card.card_name : '',
        selectable_card: gamePropStore.selectable_cards.includes(centerCard.position),
      }
    })
  }
  
  resetCards(): void {
    const resetCardState = this.createEmptyPlayerCard(null)
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
    this.resetScene()
    gamePropStore.setInteraction(lastJsonMessage?.interaction as InteractionType)
    gamePropStore.setTitle(lastJsonMessage.title)
    this.setTablePlayerCards(lastJsonMessage)
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
