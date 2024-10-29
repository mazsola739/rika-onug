import { ASSASSIN_IDS, HAS_MARK_IDS, VAMPIRE_IDS } from 'constant'
import { artifacts, cards, marks } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { areAnyCardSelectedById, checkCardPresence, createDefaultCard, determineTotalPlayers, findCardById } from 'utils'
import { playersStore } from './PlayersStore'

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  selectedCards: CardType[] = []
  selectedMarks: TokenType[] = []
  selectedExpansions: string[] = ["Werewolf", "Daybreak", "Vampire", "Alien", "Super Villains", "Bonus Roles"]
  playerCard: CardType = createDefaultCard()

  constructor() {
    makeAutoObservable(this)
  }

  getCardById(cardId: number): CardType {
    return this.deck ? findCardById(this.deck, cardId) : createDefaultCard()
  }

  setDeck(): void {
    this.deck = cards.filter(card => this.selectedExpansions.includes(card.expansion))
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds
      .map((cardId) => this.getCardById(cardId) as CardType)
      .sort((a, b) => a.id - b.id)
    this.updateSelectedMarks()
    this.updateArtifacts()
  }

  setSelectedExpansions(expansions: string[]): void {
    this.selectedExpansions = expansions
    this.setDeck()
  }

  setPlayerCard(): void {
    this.getCardById(playersStore.player.player_card_id)
  }

  get totalCharacters(): number {
    return this.selectedCards.length
  }

  get totalPlayers(): number {
    return determineTotalPlayers(this.totalCharacters)
  }

  get card(): CardType {
    return this.playerCard
  }

  get hasAlphawolf() { return checkCardPresence(this.selectedCards, 17) }
  get hasTemptress() { return checkCardPresence(this.selectedCards, 69) }
  get hasCurator() { return checkCardPresence(this.selectedCards, 20) }
  get hasVampire() { return areAnyCardSelectedById(this.selectedCards, VAMPIRE_IDS) }
  get hasTheCount() { return checkCardPresence(this.selectedCards, 39) }
  get hasRenfield() { return checkCardPresence(this.selectedCards, 38) }
  get hasDiseased() { return checkCardPresence(this.selectedCards, 32) }
  get hasCupid() { return checkCardPresence(this.selectedCards, 31) }
  get hasInstigator() { return checkCardPresence(this.selectedCards, 34) }
  get hasPriest() { return checkCardPresence(this.selectedCards, 34) }
  get hasAssassin() { return areAnyCardSelectedById(this.selectedCards, ASSASSIN_IDS) }
  get hasSentinel() { return checkCardPresence(this.selectedCards, 25) }
  get hasMarks() { return areAnyCardSelectedById(this.selectedCards, HAS_MARK_IDS) }

  updateSelectedMarks(): void {
    const markConditions: Record<string, boolean> = {
      'mark_of_vampire': this.hasVampire,
      'mark_of_fear': this.hasTheCount,
      'mark_of_the_bat': this.hasRenfield,
      'mark_of_disease': this.hasDiseased,
      'mark_of_love': this.hasCupid,
      'mark_of_traitor': this.hasInstigator,
      'mark_of_clarity': checkCardPresence(this.selectedCards, 37),
      'mark_of_assassin': this.hasAssassin
    }

    this.selectedMarks = this.marks
      .filter(mark => markConditions[mark.token_name] ?? false)
      .sort((a, b) => a.id - b.id) as TokenType[]
  }

  updateArtifacts(): void {
    this.artifacts = this.hasSentinel && this.hasCurator 
      ? artifacts.sort((a, b) => a.id - b.id) 
      : artifacts
          .filter(artifact =>
            (this.hasSentinel && artifact.token_name === 'shield') ||
            (this.hasCurator && artifact.token_name !== 'shield')
          )
          .sort((a, b) => a.id - b.id) as TokenType[]
  }
}

export default DeckStore
export const deckStore = new DeckStore()
