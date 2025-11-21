import { TEAM } from 'constants'
import { makeAutoObservable } from 'mobx'
import { deckStore } from 'store'
import { CardJson, Expansion, PlayerType, WsJsonMessageType } from 'types'
import { createDefaultCard, getCardById, getOrderedTeams, getFilteredCardsForTeam } from 'utils'

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
    return getFilteredCardsForTeam(team, deckStore.deck)
  }

  getTeamMembers(cards: CardJson[]): CardJson[] {
    return cards.slice().sort((a, b) => a.display_name.localeCompare(b.display_name))
  }

  //TODO EZ MÁR NEM KELL
  getTeamName(cards: CardJson[], team: string): string {
    /*     const hasHero = cards.some(card => card.team === TEAM.hero)
    const hasVillager = cards.some(card => card.team === TEAM.village) */

    return team
  }

  /*   
  //TODO better names
  getTeamName(cards: CardJson[], team: keyof typeof TEAMNAME): string {
    const hasHero = cards.some(card => card.team === TEAM.hero)
    const hasVillager = cards.some(card => card.team === TEAM.village)

    if (hasHero && hasVillager) return `${TEAMNAME.village} & ${TEAMNAME.hero}`
    if (hasHero) return TEAMNAME.hero
    if (hasVillager) return TEAMNAME.village
    return TEAMNAME[team] || team
  } 
  */

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
    deckStore.setSelectedExpansions(lastJsonMessage.selected_expansions as Expansion[])
    this.setRoomPlayers(lastJsonMessage.players)
  }

  clearRoom(): void {
    deckStore.clearSelections()
    this.roomPlayers = []
    this.resetDetailedCardInfo()
  }
}
export const roomStore = new RoomStore()
