import { TEAM } from 'constant'
import { makeAutoObservable } from 'mobx'
import { CardType, PlayersType } from 'types'
import { createDefaultCard, getFilteredCardsForTeam as getSortedCardsByTeam, getOrderedTeams } from 'utils'
import { deckStore } from 'store'

class RoomStore {
  detailedCardInfo: CardType = createDefaultCard()
  players: PlayersType[]

  constructor() {
    makeAutoObservable(this)
  }

  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  getSortedCardsByTeam(team: string): CardType[] {
    return getSortedCardsByTeam(team, deckStore.deck)
  }

  getTeamMembers(cards: CardType[]): CardType[] {
    return cards
      .slice()
      .sort((a, b) => a.display_name.localeCompare(b.display_name))
  }

  getTeamName(cards: CardType[], team: string): string {
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

  getDetailedCardInfo(): CardType {
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

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }
}

export default RoomStore
export const roomStore = new RoomStore()
