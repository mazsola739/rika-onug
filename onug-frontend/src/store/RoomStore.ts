import { makeAutoObservable, reaction } from 'mobx'
import { CardType, TokenType } from 'types'
import { roomStoreUtils } from 'utils'
import { deckStore } from './DeckStore'
import { expansions, team } from 'constant'
import { cards, artifacts, marks } from 'data'

const { getFilteredCardsForTeam, getOrderedTeams, filterByExpansions } =
  roomStoreUtils
const { hero, village } = team

class RoomStore {
  detailedCardInfo: CardType = deckStore.createEmptyCard()
  detailedTokenInfo: TokenType = deckStore.createEmptyToken()
  selectedExpansions: string[] = Object.keys(expansions)

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.selectedExpansions.slice(),
      (selectedExpansions) => this.filterByExpansions(selectedExpansions)
    )

    this.toggleExpansionSelection = this.toggleExpansionSelection.bind(this)
    this.setDetailedTokenInfo = this.setDetailedTokenInfo.bind(this)
  }

  setDetailedTokenInfo(tokenId: number): void {
    const token =
      deckStore.getMarkById(tokenId) ||
      deckStore.getArtifactById(tokenId) ||
      deckStore.createEmptyToken()
    this.detailedTokenInfo = token
  }

  resetDetailedTokenInfo(): void {
    this.detailedTokenInfo = deckStore.createEmptyToken()
  }

  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  getFilteredCardsForTeam(team: string): CardType[] {
    return getFilteredCardsForTeam(team, deckStore.deck)
  }

  getTeamMembers(cards: CardType[]): CardType[] {
    return cards.slice().sort((a, b) => a.order - b.order)
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

  getDetailedTokenInfo(): TokenType {
    return this.detailedTokenInfo
  }

  getDetailedCardInfo(): CardType {
    return this.detailedCardInfo
  }

  resetDetailedCardInfo(): void {
    this.detailedCardInfo = deckStore.createEmptyCard()
  }

  toggleInfo(id: number, type: 'card' | 'artifact' | 'mark'): void {
    if (type === 'card' && this.detailedCardInfo.id === id) {
      this.resetDetailedCardInfo()
      return
    }
    if (type === 'artifact' && this.detailedTokenInfo.id === id) {
      this.resetDetailedTokenInfo()
      return
    }
    if (type === 'mark' && this.detailedTokenInfo.id === id) {
      this.resetDetailedTokenInfo()
      return
    }

    if (type === 'card') {
      const newCardInfo = deckStore.getCardById(id)
      this.detailedCardInfo = newCardInfo || deckStore.createEmptyCard()
      this.resetDetailedTokenInfo()
    } else if (type === 'artifact') {
      const newTokenInfo = deckStore.getArtifactById(id)
      this.detailedTokenInfo = newTokenInfo || deckStore.createEmptyToken()
      this.resetDetailedCardInfo()
    } else if (type === 'mark') {
      const newTokenInfo = deckStore.getMarkById(id)
      this.detailedTokenInfo = newTokenInfo || deckStore.createEmptyToken()
      this.resetDetailedCardInfo()
    }
  }

  filterByExpansions(expansions: string[] = []): void {
    deckStore.deck = filterByExpansions(cards, expansions)
    deckStore.artifacts = filterByExpansions(artifacts, expansions)
    deckStore.marks = filterByExpansions(marks, expansions)
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
