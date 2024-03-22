import { VAMPIRE_IDS, ASSASSIN_IDS } from 'constant'
import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { createEmptyCard, createEmptyToken, findCardById, determineTotalPlayers, selectCard, deselectCard, areAnyCardSelectedById, isCardSelectedById } from 'utils'
import { roomStore } from './RoomStore'

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts
  selectedCards: CardType[] = []
  selectedMarks: TokenType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getCardById(cardId: number): CardType {
    if (!this.deck) {
      return createEmptyCard()
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
  }

  resetSelection(): void {
    this.selectedCards = []
    roomStore.resetDetailedCardInfo()
  }

  handleSelectCard(card: CardType): void {
    selectCard(this.selectedCards, card)
  }

  handleDeselectCard(card: CardType): void {
    deselectCard(this.selectedCards, card)
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
