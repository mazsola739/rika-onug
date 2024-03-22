import { VAMPIRE_IDS, ASSASSIN_IDS, EXPANSIONS } from 'constant'
import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { createEmptyCard, findCardById, determineTotalPlayers, areAnyCardSelectedById, isCardSelectedById } from 'utils'

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  selectedCards: CardType[] = []
  selectedMarks: TokenType[] = []
  selectedExpansions: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getCardById(cardId: number): CardType {
    if (!this.deck) {
      return createEmptyCard()
    }

    return findCardById(this.deck, cardId)
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds.map((cardId) => this.getCardById(cardId))
  }

  setSelectedExpansions(extensions: string[]): void {
    this.selectedExpansions = extensions
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

  toggleExpansionSelection(expansion: string): void {
    if (expansion) {
      if (this.selectedExpansions.includes(expansion)) {
        this.removeSelectedExpansion(expansion);
      } else {
        this.addSelectedExpansion(expansion);
      }
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
}

export default DeckStore
export const deckStore = new DeckStore()
