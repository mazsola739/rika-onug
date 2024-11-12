import { makeAutoObservable } from 'mobx'
import { deckStore, propStore, messageStore, selectionStore, playersStore } from 'store'
import { CardPosition, Interaction, MessagesType, NarrationType, TableCenterCard, TablePlayerCard, WsJsonMessage } from 'types'
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
      masons: false,
      role: '',
      team: '',
      artifact: false,
      shield: false,
      selectable_card: false,
      selectable_mark: false,
      selected: false,
      werewolves: false,
      dreamwolf: false,
      vampires: false,
      aliens: false,
      groobzerb: false,
      villains: false,
      tanner: false,
      assassins: false,
      madscientist: false
    }
  }

  createDefaultCenterCards(): TableCenterCard[] {
    const positions: CardPosition[] = ['center_wolf', 'center_left', 'center_middle', 'center_right', 'center_villain']
    const { hasAlphawolf, hasTemptress } = deckStore

    return positions
      .filter(pos => !((pos === 'center_wolf' && !hasAlphawolf) || (pos === 'center_villain' && !hasTemptress)))
      .map(pos => ({
        position: pos,
        card_name: '',
        role: '',
        team: '',
        selectable_card: false,
        selected: false
      }))
  }

  getCardStatus(position: CardPosition) {
    return {
      selectable_card: propStore.selectable_cards.includes(position),
      selectable_mark: propStore.selectable_marks.includes(position),
      artifact: propStore.artifacted_cards.includes(position),
      shield: propStore.shielded_cards.includes(position),
      werewolves: propStore.werewolves.includes(position),
      dreamwolf: propStore.dreamwolf.includes(position),
      masons: propStore.masons.includes(position),
      vampires: propStore.vampires.includes(position),
      aliens: propStore.aliens.includes(position),
      groobzerb: propStore.groobzerb.includes(position),
      villains: propStore.villains.includes(position),
      tanner: propStore.tanner.includes(position),
      assassins: propStore.assassins.includes(position),
      madscientist: propStore.madscientist.includes(position),
      seers: propStore.seers.includes(position),
      lovers: propStore.lovers.includes(position),
      part_of_blob: propStore.part_of_blob.includes(position),
      part_of_family: propStore.part_of_family.includes(position)
    }
  }

  getShowCardsMap(): Record<CardPosition, number> {
    const showCards = propStore.show_cards
    if (Array.isArray(showCards)) {
      return showCards.reduce((acc, card) => ({ ...acc, ...card }), {} as Record<CardPosition, number>)
    }
    return showCards as Record<CardPosition, number>
  }

  setTablePlayerCard(lastJsonMessage: WsJsonMessage): void {
    const player = lastJsonMessage.player
    const cardId = player.player_card_id
    const card = getCardById(cardId)

    this.tablePlayerCard = {
      player_name: player.player_name || 'You',
      position: player.player_number,
      card_name: card ? card.card_name : '',
      mark: player.player_mark || '',
      artifact: player.player_artifact || null,
      role: player.player_role || '',
      team: player.player_team || '',
      selected: false,
      ...this.getCardStatus(player.player_number)
    }
  }

  setTablePlayerCards(lastJsonMessage: WsJsonMessage): void {
    const players = lastJsonMessage.players || []
    const showCards = this.getShowCardsMap()

    this.tablePlayerCards = Array.from({ length: deckStore.totalPlayers }, (_, i) => {
      const position = `player_${i + 1}` as CardPosition
      const defaultCard = this.createEmptyPlayerCard(position)

      const playerCard = players.find(player => position === player.player_number)
      if (!playerCard) return defaultCard

      const cardId = showCards[position] || playerCard.player_card_id
      const card = getCardById(cardId)

      return {
        ...defaultCard,
        player_name: playerCard.player_name,
        card_name: card ? card.card_name : '',
        mark: playerCard.player_mark || '',
        role: playerCard.player_role || '',
        team: playerCard.player_team || '',
        selected: false,
        ...this.getCardStatus(position)
      }
    })
  }

  setTableCenterCards(lastJsonMessage: WsJsonMessage): void {
    const incomingCenterCards = lastJsonMessage.center_cards || []
    const showCards = this.getShowCardsMap()
    const centerCardsMap = Object.fromEntries(incomingCenterCards.map(card => [card.card_position, card]))

    this.tableCenterCards = this.createDefaultCenterCards().map(centerCard => {
      const incomingCard = centerCardsMap[centerCard.position]
      const cardId = showCards[centerCard.position] || (incomingCard ? incomingCard.card_id : null)
      const card = cardId ? getCardById(cardId) : null

      return {
        ...centerCard,
        card_name: card ? card.card_name : '',
        role: incomingCard ? incomingCard.card_role : '',
        team: incomingCard ? incomingCard.card_team : '',
        selectable_card: propStore.selectable_cards.includes(centerCard.position),
        selected: false
      }
    })
  }

  resetCards(): void {
    const resetCardState = this.createEmptyPlayerCard(null)
    this.tablePlayerCard = {
      ...resetCardState,
      position: this.tablePlayerCard.position
    }
    this.tablePlayerCards = this.tablePlayerCards.map(card => ({
      ...resetCardState,
      position: card.position
    }))
    this.tableCenterCards = this.tableCenterCards.map(centerCard => ({
      ...centerCard,
      card_name: '',
      selectable_card: false,
      selected: false
    }))
  }

  clearMemory(): void {
    this.resetCards()
    propStore.emptyValues()
    selectionStore.resetSelection()
    messageStore.deleteMessage()
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    this.clearMemory()
    playersStore.setPlayer(lastJsonMessage.player)
    playersStore.setPlayers(lastJsonMessage.players)
    deckStore.setPlayerCard()
    deckStore.setPlayerMark()
    propStore.setInteraction(lastJsonMessage.interaction as Interaction)
    propStore.setTitle(lastJsonMessage.title)
    this.setTablePlayerCards(lastJsonMessage)
    this.setTableCenterCards(lastJsonMessage)
    this.setTablePlayerCard(lastJsonMessage)
  }

  closeYourEyes(): void {
    this.clearMemory()
  }
}

export default RiseAndRestStore
export const riseAndRestStore = new RiseAndRestStore()
