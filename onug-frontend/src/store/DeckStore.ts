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

}

export default DeckStore
export const deckStore = new DeckStore()
