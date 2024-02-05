import { makeAutoObservable, reaction } from 'mobx'
import { CardType } from 'types'
import { roomStoreUtils } from 'utils'
import { deckStore } from './DeckStore'
import { expansions, team } from 'constant'
import { cards } from 'data'

const { getFilteredCardsForTeam, getOrderedTeams, filterByExpansions } =
  roomStoreUtils
const { hero, village } = team

class RoomStore {
  detailedCardInfo: CardType = deckStore.createEmptyCard()
  selectedExpansions: string[] = Object.keys(expansions)

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.selectedExpansions.slice(),
      (selectedExpansions) => this.filterByExpansions(selectedExpansions)
    )

    this.toggleExpansionSelection = this.toggleExpansionSelection.bind(this)
  }

  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  getFilteredCardsForTeam(team: string): CardType[] {
    return getFilteredCardsForTeam(team, deckStore.deck)
  }

  getTeamMembers(cards: CardType[]): CardType[] {
    return cards
      .slice()
      .sort((a, b) => a.display_name.localeCompare(b.display_name))
  }

  getTeamName(cards: CardType[], team: string): string {
    const hasHero = cards.some((card) => card.team === hero)
    const hasVillager = cards.some((card) => card.team === village)

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
    this.detailedCardInfo = deckStore.createEmptyCard()
  }

  toggleInfo(id: number): void {
    if (this.detailedCardInfo.id === id) {
      this.resetDetailedCardInfo()
      return
    }

    const newCardInfo = deckStore.getCardById(id)
    this.detailedCardInfo = newCardInfo || deckStore.createEmptyCard()
  }

  filterByExpansions(expansions: string[] = []): void {
    deckStore.deck = filterByExpansions(cards, expansions)
  }

  toggleExpansionSelection(expansion: string): void {
    const shortName = this.getExpansionShortName(expansion)
    if (shortName) {
      this.selectedExpansions.includes(shortName)
        ? this.removeSelectedExpansion(shortName)
        : this.addSelectedExpansion(shortName)
    }
  }

  addSelectedExpansion(expansion: string): void {
    this.selectedExpansions.push(expansion)
  }

  removeSelectedExpansion(expansion: string): void {
    this.selectedExpansions = this.selectedExpansions.filter(
      (selected) => selected !== expansion
    )
  }

  getExpansionShortName(fullName: string): string | undefined {
    return Object.keys(expansions).find((key) => expansions[key] === fullName)
  }
}

export default RoomStore
export const roomStore = new RoomStore()
