import { assassinIds, vampireIds } from 'constant'
import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { roomStore } from 'store'
import { CardType, TokenType } from 'types'
import { deckStoreUtils, utils } from 'utils'

const {
  createEmptyCard,
  createEmptyToken,
  deselectCard,
  determineTotalPlayers,
  selectCard,
} = deckStoreUtils
const { areAnyCardSelectedById, findCardById, isCardSelectedById } = utils

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  selectedCards: CardType[] = []
  MAX_ALLOWED_PLAYERS = 12
  selectedMarks: TokenType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  createEmptyCard(): CardType {
    return createEmptyCard()
  }

  createEmptyToken(): TokenType {
    return createEmptyToken()
  }

  getCardById(cardId: number): CardType {
    if (!this.deck) {
      return this.createEmptyCard()
    }

    return findCardById(this.deck, cardId)
  }

  get totalCharacters(): number {
    return this.selectedCards.length
  }

  get totalPlayers(): number {
    return determineTotalPlayers(this.totalCharacters, this.selectedCards)
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds.map((cardId) => this.getCardById(cardId))
    /* this.updateSelectedMarks() */
  }

  resetSelection(): void {
    this.selectedCards = []
    roomStore.resetDetailedCardInfo()
    /* this.updateSelectedMarks() */
  }

  handleSelectCard(card: CardType): void {
    selectCard(this.selectedCards, card)
    /* this.updateSelectedMarks() */
  }

  handleDeselectCard(card: CardType): void {
    deselectCard(this.selectedCards, card)
    /* this.updateSelectedMarks() */
  }

  updateSelectedMarks(): void {
    //TODO bug
    this.selectedMarks = this.marks.filter((mark) => {
      switch (mark.token_name) {
        case 'mark_of_vampire':
          return areAnyCardSelectedById(this.selectedCards, vampireIds)
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
          return areAnyCardSelectedById(this.selectedCards, assassinIds)
        default:
          return false
      }
    })
  }
}

export default DeckStore
export const deckStore = new DeckStore()
