import { TEAM } from 'constant'
import { makeAutoObservable } from 'mobx'
import { deckStore } from 'store'
import { CardJson, Player } from 'types'
import { createDefaultCard, getOrderedTeams, getFilteredCardsForTeam as getSortedCardsByTeam } from 'utils'

class RoomStore {
  detailedCardInfo: CardJson = createDefaultCard()
  roomPlayers: Player[]

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
    return cards
      .slice()
      .sort((a, b) => a.display_name.localeCompare(b.display_name))
  }

  getTeamName(cards: CardJson[], team: string): string {
    const hasHero = cards.some((card) => card.team === TEAM.hero)
    const hasVillager = cards.some((card) => card.team === TEAM.village)

    return hasHero && hasVillager
      ? 'Village & Hero'
      : hasHero
        ? 'Hero'
        : hasVillager
          ? 'Village'
          : team
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

    const newCardInfo = deckStore.getCardById(id)
    this.detailedCardInfo = newCardInfo || createDefaultCard()
  }

  setRoomPlayers(players: Player[]): void {
    this.roomPlayers = players
  }
}

export default RoomStore
export const roomStore = new RoomStore()
