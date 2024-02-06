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
  selectedMarks: TokenType[] = marks
  selectedCardIds: number[] = []

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

  isSelected(cardId: number): boolean {
    return this.selectedCardIds.includes(cardId)
  }

  setSelectedCard(cardIds: number[]): void {
    this.selectedCards = cardIds.map((cardId) => deckStore.getCardById(cardId))
    this.selectedCardIds = cardIds
  }

  resetSelection(): void {
    this.selectedCards = []
    roomStore.resetDetailedCardInfo()
    this.updateMarksInDeckStatus()
  }

  handleSelectCard(card: CardType): void {
    selectCard(this.selectedCards, card)
    this.updateMarksInDeckStatus()
  }

  handleDeselectCard(card: CardType): void {
    deselectCard(this.selectedCards, card)
    this.updateMarksInDeckStatus()
  }

  updateSelectedCards(cardIds: number[]): void {
    this.selectedCards = []
    cardIds.forEach((cardId) => {
      this.handleSelectCard(findCardById(this.deck, cardId))
    })
  }

  updateMarksInDeckStatus(): void {
    this.selectedMarks.forEach((mark) => {
      switch (mark.token_name) {
        case 'mark_of_vampire':
          mark.is_in_deck = areAnyCardSelectedById(
            this.selectedCards,
            vampireIds
          )
          break
        case 'mark_of_fear':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 39)
          break
        case 'mark_of_the_bat':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 38)
          break
        case 'mark_of_disease':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 32)
          break
        case 'mark_of_love':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 31)
          break
        case 'mark_of_traitor':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 34)
          break
        case 'mark_of_clarity':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 37)
          break
        case 'mark_of_assassin':
          mark.is_in_deck = areAnyCardSelectedById(
            this.selectedCards,
            assassinIds
          )
          break
        default:
          break
      }
    })
  }
}

export default DeckStore
export const deckStore = new DeckStore()
