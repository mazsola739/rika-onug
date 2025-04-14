import { makeAutoObservable } from 'mobx'
import { deckStore, messageStore, playersStore, propStore, selectionStore } from 'store'
import { CardPositionType, InteractionType, TableCenterCard, TablePlayerCard, WsJsonMessageType } from 'types'
import { getCardById, getMarkByName } from 'utils'

class RiseAndRestStore {
  tablePlayerCard: TablePlayerCard = {}
  tablePlayerCards: TablePlayerCard[] = []
  tableCenterCards: TableCenterCard[] = []

  constructor() {
    makeAutoObservable(this)
  }

  createEmptyPlayerCard(position: CardPositionType): TablePlayerCard {
    return {
      position,

      aliens: false,
      apprenticeassassins: false,
      artifact: false,
      assassins: false,
      card_name: '',
      cow: false,
      current: false,
      dreamwolf: false,
      groobzerb: false,
      lovers: false,
      madscientist: false,
      mark: '',
      masons: false,
      part_of_blob: false,
      part_of_family: false,
      role: '',
      selectable_card: false,
      selectable_mark: false,
      selected_card: false,
      selected_mark: false,
      shield: false,
      tanner: false,
      team: '',
      vampires: false,
      villains: false,
      werewolves: false,
      witness: false
    }
  }

  createDefaultCenterCards(): TableCenterCard[] {
    const positions: CardPositionType[] = ['center_wolf', 'center_left', 'center_middle', 'center_right', 'center_villain']
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

  getCardStatus(position: CardPositionType) {
    return {
      aliens: propStore.aliens.includes(position),
      apprenticeassassins: propStore.apprenticeassassins.includes(position),
      artifact: propStore.artifacted_cards.includes(position),
      assassins: propStore.assassins.includes(position),
      cow: propStore.cow.includes(position),
      current: propStore.current.includes(position),
      dreamwolf: propStore.dreamwolf.includes(position),
      groobzerb: propStore.groobzerb.includes(position),
      lovers: propStore.lovers.includes(position),
      madscientist: propStore.madscientist.includes(position),
      masons: propStore.masons.includes(position),
      part_of_blob: propStore.part_of_blob.includes(position),
      part_of_family: propStore.part_of_family.includes(position),
      seers: propStore.seers.includes(position),
      selectable_card: propStore.selectable_cards.includes(position),
      selectable_mark: propStore.selectable_marks.includes(position),
      shield: propStore.shielded_cards.includes(position),
      tanner: propStore.tanner.includes(position),
      vampires: propStore.vampires.includes(position),
      villains: propStore.villains.includes(position),
      werewolves: propStore.werewolves.includes(position),
      witness: propStore.witness.includes(position)
    }
  }

  getShowCardsMap(): Record<CardPositionType, number> {
    const showCards = propStore.show_cards
    if (Array.isArray(showCards)) {
      return showCards.reduce((acc, card) => ({ ...acc, ...card }), {} as Record<CardPositionType, number>)
    }
    return showCards as Record<CardPositionType, number>
  }
  getShowMarksMap(): Record<CardPositionType, string> {
    const showMarks = propStore.show_marks
    if (Array.isArray(showMarks)) {
      return showMarks.reduce((acc, mark) => ({ ...acc, ...mark }), {} as Record<CardPositionType, string>)
    }
    return showMarks as Record<CardPositionType, string>
  }

  setTablePlayerCard(lastJsonMessage: WsJsonMessageType): void {
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
      selected_card: false,
      selected_mark: false,
      ...this.getCardStatus(player.player_number)
    }
  }

  setTablePlayerCards(): void {
    const players = playersStore.players
    const showCards = this.getShowCardsMap()
    const showMarks = this.getShowMarksMap()

    this.tablePlayerCards = Array.from({ length: deckStore.totalPlayers }, (_, i) => {
      const position = `player_${i + 1}` as CardPositionType
      const defaultCard = this.createEmptyPlayerCard(position)

      const playerCard = players.find(player => position === player.player_number)
      if (!playerCard) return defaultCard

      const cardId = showCards[position] || playerCard.player_card_id
      const card = getCardById(cardId)

      const markName = showMarks[position] || playerCard.player_mark
      const mark = getMarkByName(markName)

      return {
        ...defaultCard,
        player_name: playerCard.player_name,
        card_name: card ? card.card_name : '',
        mark: mark ? markName : '',
        role: playerCard.player_role || '',
        team: playerCard.player_team || '',
        selected: false,
        ...this.getCardStatus(position)
      }
    })
  }

  setTableCenterCards(lastJsonMessage: WsJsonMessageType): void {
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
      position: this.tablePlayerCard.position,
      player_name: this.tablePlayerCard.player_name
    }
    this.tablePlayerCards = this.tablePlayerCards.map(card => ({
      ...resetCardState,
      position: card.position,
      player_name: card.player_name
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
  }

  openYourEyes(lastJsonMessage: WsJsonMessageType): void {
    this.clearMemory()
    propStore.setInteraction(lastJsonMessage?.action as InteractionType)
    propStore.setTitle(lastJsonMessage.title)
    this.setTablePlayerCards()
    this.setTableCenterCards(lastJsonMessage)
    this.setTablePlayerCard(lastJsonMessage)
  }

  closeYourEyes(): void {
    this.clearMemory()
    messageStore.setPrivateMessage([])
    messageStore.setNarration([])
  }
}

export default RiseAndRestStore
export const riseAndRestStore = new RiseAndRestStore()
