import { HAS_MARK_IDS, VAMPIRE_IDS, ASSASSIN_IDS } from 'constants'
import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardJson, TokenJson, Expansion, Style } from 'types'
import { getCardById, determineTotalPlayers, checkCardPresence, areAnyCardSelectedById } from 'utils'

//TODO fix unable to select more then '12' players cards
class DeckStore {
  deck: CardJson[] = cards
  marks: TokenJson[] = marks
  artifacts: TokenJson[] = artifacts

  selectedCards: CardJson[] = []
  selectedMarks: TokenJson[] = []
  selectedExpansions: Expansion[] = []
  //TODO   selectedExpansions: Expansion[] = ['Werewolf', 'Daybreak', 'Vampire', 'Alien', 'Super Villains', 'Bonus Roles'] valami most nem jó, nem kéne a gomboknak teljesen eltünnie
  selectedStyle: Style = 'classic'

  constructor() {
    makeAutoObservable(this)
    this.selectedExpansions = this.getExpansionsForStyle(this.selectedStyle)
    this.setDeck()
  }

  getExpansionsForStyle(style: Style): Expansion[] {
    const expansions = new Set<Expansion>()
    if (style === 'classic') {
      ;['Werewolf', 'Daybreak', 'Vampire', 'Alien', 'Bonus Roles'].forEach(expansion => expansions.add(expansion as Expansion))
    }
    if (style === 'comic') {
      ;['Super Villains', 'Bonus Roles'].forEach(expansion => expansions.add(expansion as Expansion))
    }
    return Array.from(expansions)
  }

  setSelectedStyles(style: Style): void {
    this.selectedStyle = style
    this.selectedExpansions = this.getExpansionsForStyle(style)
    this.setDeck()
  }

  setDeck(): void {
    this.deck = cards.filter(card => this.selectedStyle.includes(card.style as Style)).filter(card => this.selectedExpansions.includes(card.expansion as Expansion))
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds.map(cardId => getCardById(cardId) as CardJson)
    this.updateSelectedMarks()
    this.updateArtifacts()
  }

  setSelectedExpansions(expansions: Expansion[]): void {
    this.selectedExpansions = expansions
    this.setDeck()
  }

  get selectedExpansionsList(): Expansion[] {
    return this.selectedExpansions
  }

  get totalCharacters(): number {
    return this.selectedCards.length
  }
  get totalPlayers(): number {
    return determineTotalPlayers(this.totalCharacters)
  }

  get hasAlphawolf() {
    return checkCardPresence(this.selectedCards, 17)
  }
  get hasTemptress() {
    return checkCardPresence(this.selectedCards, 69)
  }
  get hasCurator() {
    return checkCardPresence(this.selectedCards, 20)
  }
  get hasSentinel() {
    return checkCardPresence(this.selectedCards, 25)
  }
  get hasMarks() {
    return areAnyCardSelectedById(this.selectedCards, HAS_MARK_IDS)
  }
  get hasVampire() {
    return areAnyCardSelectedById(this.selectedCards, VAMPIRE_IDS)
  }
  get hasTheCount() {
    return checkCardPresence(this.selectedCards, 39)
  }
  get hasRenfield() {
    return checkCardPresence(this.selectedCards, 38)
  }
  get hasDiseased() {
    return checkCardPresence(this.selectedCards, 32)
  }
  get hasCupid() {
    return checkCardPresence(this.selectedCards, 31)
  }
  get hasInstigator() {
    return checkCardPresence(this.selectedCards, 34)
  }
  get hasPriest() {
    return checkCardPresence(this.selectedCards, 37)
  }
  get hasAssassin() {
    return areAnyCardSelectedById(this.selectedCards, ASSASSIN_IDS)
  }

  updateSelectedMarks(): void {
    const markConditions: Record<string, boolean> = {
      mark_of_vampire: this.hasVampire,
      mark_of_fear: this.hasTheCount,
      mark_of_the_bat: this.hasRenfield,
      mark_of_disease: this.hasDiseased,
      mark_of_love: this.hasCupid,
      mark_of_traitor: this.hasInstigator,
      mark_of_clarity: this.hasPriest || this.hasMarks,
      mark_of_assassin: this.hasAssassin
    }

    this.selectedMarks = this.marks.filter(mark => markConditions[mark.token_name] ?? false)
  }

  updateArtifacts(): void {
    this.artifacts = artifacts.filter(artifact => {
      const isExpansionSelected = this.selectedExpansions.includes(artifact.expansion as Expansion)

      if (this.hasSentinel && this.hasCurator) {
        return isExpansionSelected
      }

      if (this.hasSentinel) {
        return isExpansionSelected && artifact.token_name === 'shield'
      }

      if (this.hasCurator) {
        return isExpansionSelected && artifact.token_name !== 'shield'
      }
      return false
    })
  }

  clearSelections(): void {
    this.selectedCards = []
    this.selectedMarks = []
    this.selectedStyle = 'classic'
    this.selectedExpansions = this.getExpansionsForStyle(this.selectedStyle)
  }
}

export const deckStore = new DeckStore()
