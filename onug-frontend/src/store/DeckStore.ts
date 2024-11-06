import { ASSASSIN_IDS, HAS_MARK_IDS, VAMPIRE_IDS } from 'constant'
import { artifacts, cards, marks } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardJson, Expansion, TokenJson } from 'types'
import {
  areAnyCardSelectedById,
  checkCardPresence,
  createDefaultCard,
  createDefaultToken,
  determineTotalPlayers,
  getCardById,
  getMarkByName
} from 'utils'
import { playersStore } from './PlayersStore'

class DeckStore {
  deck: CardJson[] = cards
  marks: TokenJson[] = marks
  artifacts: TokenJson[] = artifacts
  selectedCards: CardJson[] = []
  selectedMarks: TokenJson[] = []
  selectedExpansions: Expansion[] = ['Werewolf', 'Daybreak', 'Vampire', 'Alien', 'Super Villains', 'Bonus Roles']
  playerCard: CardJson = createDefaultCard()
  playerMark: TokenJson = createDefaultToken()

  constructor() {
    makeAutoObservable(this)
  }

  setDeck(): void {
    this.deck = cards.filter(card => this.selectedExpansions.includes(card.expansion as Expansion))
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

  setPlayerCard(): void {
    const card = getCardById(playersStore.player.player_card_id)
    this.playerCard = card
  }

  setPlayerMark(): void {
    const mark = getMarkByName('mark_of_clarity')
    this.playerMark = mark
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
    return checkCardPresence(this.selectedCards, 34)
  }
  get hasAssassin() {
    return areAnyCardSelectedById(this.selectedCards, ASSASSIN_IDS)
  }
  get hasSentinel() {
    return checkCardPresence(this.selectedCards, 25)
  }
  get hasMarks() {
    return areAnyCardSelectedById(this.selectedCards, HAS_MARK_IDS)
  }

  updateSelectedMarks(): void {
    const markConditions: Record<string, boolean> = {
      mark_of_vampire: this.hasVampire,
      mark_of_fear: this.hasTheCount,
      mark_of_the_bat: this.hasRenfield,
      mark_of_disease: this.hasDiseased,
      mark_of_love: this.hasCupid,
      mark_of_traitor: this.hasInstigator,
      mark_of_clarity: checkCardPresence(this.selectedCards, 37),
      mark_of_assassin: this.hasAssassin
    }

    this.selectedMarks = this.marks.filter(mark => markConditions[mark.token_name] ?? false)
  }

  updateArtifacts(): void {
    this.artifacts =
      this.hasSentinel && this.hasCurator
        ? artifacts
        : artifacts.filter(
            artifact => (this.hasSentinel && artifact.token_name === 'shield') || (this.hasCurator && artifact.token_name !== 'shield')
          )
  }

  clearPlayerCard(): void {
    const card = createDefaultCard()
    this.playerCard = card
  }

  clearPlayerMark(): void {
    const mark = createDefaultToken()
    this.playerMark = mark
  }
}

export default DeckStore
export const deckStore = new DeckStore()
