import { TEAM } from 'constant'
import { makeAutoObservable } from 'mobx'
import { deckStore } from 'store'
import { CardJson, ExpansionType, PlayerType, WsJsonMessageType } from 'types'
import { createDefaultCard, getCardById, getOrderedTeams, getFilteredCardsForTeam as getSortedCardsByTeam } from 'utils'

class RoomStore {
  detailedCardInfo: CardJson = createDefaultCard()
  roomPlayers: PlayerType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  getSortedCardsByTeam(team: string): CardJson[] {
    return getSortedCardsByTeam(team, deckStore.deck)
  }

  getTeamMembers(cards: CardJson[]): CardJson[] {
    return cards.slice().sort((a, b) => a.display_name.localeCompare(b.display_name))
  }

  getTeamName(cards: CardJson[], team: string): string {
    //TODO better names
    const hasHero = cards.some(card => card.team === TEAM.hero)
    const hasVillager = cards.some(card => card.team === TEAM.village)

    return hasHero && hasVillager ? 'Village & Hero' : hasHero ? 'Hero' : hasVillager ? 'Village' : team
  }

  getDetailedCardInfo(): CardJson {
    return this.detailedCardInfo
  }

  resetDetailedCardInfo(): void {
    this.detailedCardInfo = createDefaultCard()
  }

  toggleInfo(id: number): void {
    if (this.detailedCardInfo.id === id) {
      this.resetDetailedCardInfo()
      return
    }

    const newCardInfo = getCardById(id)
    this.detailedCardInfo = newCardInfo || createDefaultCard()
  }

  setRoomPlayers(players: PlayerType[]): void {
    this.roomPlayers = players
  }

  equipRoom(lastJsonMessage: WsJsonMessageType): void {
    deckStore.setSelectedCard(lastJsonMessage.selected_cards)
    deckStore.setSelectedExpansions(lastJsonMessage.selected_expansions as ExpansionType[])
    this.setRoomPlayers(lastJsonMessage.players)
  }

  clearRoom(): void {
    deckStore.clearSelections()
    this.roomPlayers = []
    this.resetDetailedCardInfo()
  }
}

export default RoomStore
export const roomStore = new RoomStore()
