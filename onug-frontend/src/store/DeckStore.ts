import { VAMPIRE_IDS, ASSASSIN_IDS } from 'constant'
import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { createEmptyCard, findCardById, areAnyCardSelectedById, isCardSelectedById, determineTotalPlayers } from 'utils'

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  selectedCards: CardType[] = []
  selectedMarks: TokenType[] = []
  selectedExpansions: string[] = ["Werewolf", "Daybreak", "Vampire", "Alien", "Super Villains", "Bonus Roles"]

  constructor() {
    makeAutoObservable(this)
  }

  getCardById(cardId: number): CardType {
    if (!this.deck) {
      return createEmptyCard()
    }

    return findCardById(this.deck, cardId)
  }

  setDeck(): void {
    this.deck = cards.filter(card => this.selectedExpansions.includes(card.expansion))
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds.map((cardId) => this.getCardById(cardId))
    this.updateSelectedMarks()
  }

  setSelectedExpansions(expansions: string[]): void {
    this.selectedExpansions = expansions
    this.setDeck()
  }

  get totalCharacters(): number {
    return this.selectedCards.length
  }

  get totalPlayers(): number {
    return determineTotalPlayers(this.totalCharacters, this.selectedCards)
  }
  
  //TODO fix, not working
  updateSelectedMarks(): void {
    this.selectedMarks = this.marks.filter((mark) => {
      switch (mark.token_name) {
        case 'mark_of_vampire':
          return areAnyCardSelectedById(this.selectedCards, VAMPIRE_IDS)
        case 'mark_of_fear':
          return isCardSelectedById(this.selectedCards, 39)
        case 'mark_of_the_bat':
          return isCardSelectedById(this.selectedCards, 38)
        case 'mark_of_disease':
          return isCardSelectedById(this.selectedCards, 32)
        case 'mark_of_love':
          return isCardSelectedById(this.selectedCards, 31)
        case 'mark_of_traitor':
          return isCardSelectedById(this.selectedCards, 34)
        case 'mark_of_clarity':
          return isCardSelectedById(this.selectedCards, 37)
        case 'mark_of_assassin':
          return areAnyCardSelectedById(this.selectedCards, ASSASSIN_IDS)
        default:
          return false
      }
    })
  }
}

export default DeckStore
export const deckStore = new DeckStore()
