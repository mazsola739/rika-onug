import { expansions, team } from 'constant'
import { cards, artifacts, marks } from 'data'
import { makeAutoObservable, reaction } from 'mobx'
import { CardType, TokenType } from 'types'
import { deckStoreUtils } from 'utils'

const {
  createEmptyCard,
  createEmptyToken,
  getFilteredCardsForTeam,
  getOrderedTeams,
  filterByExpansions,
  findById,
} = deckStoreUtils

const { hero, village } = team

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  detailedCardInfo: CardType = this.createEmptyCard()
  detailedTokenInfo: TokenType = this.createEmptyToken()
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

  createEmptyCard(): CardType {
    return createEmptyCard()
  }

  createEmptyToken(): TokenType {
    return createEmptyToken()
  }

  getCardById(cardId: number): CardType {
    return findById(this.deck, cardId) || this.createEmptyCard()
  }

  getArtifactById(tokenId: number): TokenType {
    return findById(this.artifacts, tokenId) || this.createEmptyToken()
  }

  getMarkById(tokenId: number): TokenType {
    return findById(this.marks, tokenId) || this.createEmptyToken()
  }

  setDetailedTokenInfo(tokenId: number): void {
    const token =
      this.getMarkById(tokenId) ||
      this.getArtifactById(tokenId) ||
      this.createEmptyToken()
    this.detailedTokenInfo = token
  }

  resetDetailedTokenInfo(): void {
    this.detailedTokenInfo = this.createEmptyToken()
  }

  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  getFilteredCardsForTeam(team: string): CardType[] {
    return getFilteredCardsForTeam(team, this.deck)
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
    this.detailedCardInfo = this.createEmptyCard()
  }

  toggleInfo(id: number, type: 'card' | 'token'): void {
    if (type === 'card' && this.detailedCardInfo.id === id) {
      this.resetDetailedCardInfo()
      return
    }
    if (type === 'token' && this.detailedTokenInfo.id === id) {
      this.resetDetailedTokenInfo()
      return
    }

    if (type === 'card') {
      const newCardInfo = this.getCardById(id)
      this.detailedCardInfo = newCardInfo || this.createEmptyCard()
      this.resetDetailedTokenInfo()
    } else {
      const newTokenInfo = this.getMarkById(id) || this.getArtifactById(id)
      this.detailedTokenInfo = newTokenInfo || this.createEmptyToken()
      this.resetDetailedCardInfo()
    }
  }

  filterByExpansions(expansions: string[] = []): void {
    this.deck = filterByExpansions(cards, expansions)
    this.artifacts = filterByExpansions(artifacts, expansions)
    this.marks = filterByExpansions(marks, expansions)
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

export default DeckStore
export const deckStore = new DeckStore()
