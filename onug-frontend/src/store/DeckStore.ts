import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { deckStoreUtils, utils } from 'utils'

const { createEmptyCard, createEmptyToken } = deckStoreUtils
const { findById } = utils

class DeckStore {
  deck: CardType[] = cards
  marks: TokenType[] = marks
  artifacts: TokenType[] = artifacts

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
    return findById(this.deck, cardId) || this.createEmptyCard()
  }

  getArtifactById(tokenId: number): TokenType {
    return findById(this.artifacts, tokenId) || this.createEmptyToken()
  }

  getMarkById(tokenId: number): TokenType {
    return findById(this.marks, tokenId) || this.createEmptyToken()
  }
}

export default DeckStore
export const deckStore = new DeckStore()
