import { expansions } from 'constant'
import { cards, artifacts, marks } from 'data'
import { makeAutoObservable, reaction } from 'mobx'
import { CardType, TokenType } from 'types'
import { deckStoreUtils } from 'utils'

const {
  createEmptyCard,
  createEmptyToken,
  getFilteredCardsForTeam,
  getOrderedTeams,
} = deckStoreUtils

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  detailedCardInfo: CardType = this.createEmptyCard()
  detailedTokenInfo: TokenType = this.createEmptyToken()
  selectedExpansions: string[] = Object.keys(expansions)

  constructor() {
    makeAutoObservable(this)

    // Reaction to changes in selected expansions to filter the deck accordingly.
    reaction(
      () => this.selectedExpansions.slice(),
      (selectedExpansions) => this.filterByExpansions(selectedExpansions)
    )

    // Bind methods to ensure they have the correct context when invoked.
    this.toggleExpansionSelection = this.toggleExpansionSelection.bind(this)
    this.setDetailedTokenInfo = this.setDetailedTokenInfo.bind(this)
  }

  // Return an empty card object.
  createEmptyCard(): CardType {
    return createEmptyCard()
  }

  // Return an empty token object.
  createEmptyToken(): TokenType {
    return createEmptyToken()
  }

  // Retrieve a card from the deck based on its ID.
  getCardById(cardId: number): CardType {
    return this.deck.find((card) => card.id === cardId)
  }

  // Retrieve an artifact from the list based on its ID.
  getArtifactById(tokenId: number): TokenType {
    return this.artifacts.find((artifact) => artifact.id === tokenId)
  }

  // Retrieve a mark from the list based on its ID.
  getMarkById(tokenId: number): TokenType {
    return this.marks.find((mark) => mark.id === tokenId)
  }

  // Set detailed token information based on its ID.
  setDetailedTokenInfo(tokenId: number): void {
    const token =
      this.getMarkById(tokenId) ||
      this.getArtifactById(tokenId) ||
      this.createEmptyToken()
    this.detailedTokenInfo = token
  }

  // Reset detailed token information to its default state.
  resetDetailedTokenInfo(): void {
    this.detailedTokenInfo = this.createEmptyToken()
  }

  // Sort and return the team names based on their predefined order.
  getOrderedTeams(teamArray: string[]): string[] {
    return getOrderedTeams(teamArray)
  }

  // Filter cards based on the specified team.
  getFilteredCardsForTeam(team: string): CardType[] {
    return getFilteredCardsForTeam(team, this.deck)
  }

  // Sort and return team members based on their order property.
  getTeamMembers(cards: CardType[]): CardType[] {
    return cards.slice().sort((a, b) => a.order - b.order)
  }

  // Determine and return the team name based on the provided cards.
  getTeamName(cards: CardType[], team: string): string {
    const hasHero = cards.some((card) => card.team === 'hero')
    const hasVillager = cards.some((card) => card.team === 'village')

    return hasHero && hasVillager
      ? 'Village & Hero'
      : hasHero
        ? 'Hero'
        : hasVillager
          ? 'Village'
          : team
  }

  // Retrieve detailed token information.
  getDetailedTokenInfo(): TokenType {
    return this.detailedTokenInfo
  }

  // Retrieve detailed card information.
  getDetailedCardInfo(): CardType {
    return this.detailedCardInfo
  }

  // Reset detailed card information to its default state.
  resetDetailedCardInfo(): void {
    this.detailedCardInfo = this.createEmptyCard()
  }

  // Toggle detailed information display between card and token.
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

  // Filter cards, artifacts, and marks based on selected expansions.
  filterByExpansions(expansions: string[] = []): void {
    this.deck = cards.filter((card) => expansions.includes(card.expansion))
    this.artifacts = artifacts.filter((artifact) =>
      expansions.includes(artifact.expansion)
    )
    this.marks = marks.filter((mark) => expansions.includes(mark.expansion))
  }

  // Toggle selection of an expansion.
  toggleExpansionSelection(expansion: string): void {
    const shortName = this.getExpansionShortName(expansion)
    if (shortName) {
      this.selectedExpansions.includes(shortName)
        ? this.removeSelectedExpansion(shortName)
        : this.addSelectedExpansion(shortName)
    }
  }

  // Add an expansion to the selected list.
  addSelectedExpansion(expansion: string): void {
    this.selectedExpansions.push(expansion)
  }

  // Remove an expansion from the selected list.
  removeSelectedExpansion(expansion: string): void {
    this.selectedExpansions = this.selectedExpansions.filter(
      (selected) => selected !== expansion
    )
  }

  // Retrieve the short name of an expansion based on its full name.
  getExpansionShortName(fullName: string): string | undefined {
    return Object.keys(expansions).find((key) => expansions[key] === fullName)
  }
}

export default DeckStore
export const deckStore = new DeckStore()
