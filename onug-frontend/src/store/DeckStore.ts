import { cards, marks, artifacts } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardType, TokenType } from 'types'
import { deckStoreUtils, utils } from 'utils'

const { createEmptyCard, createEmptyToken } = deckStoreUtils
const { findCardById } = utils

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
    if (!this.deck) {
      return this.createEmptyCard()
    }

    return findCardById(this.deck, cardId)
  }

  getArtifactById(tokenId: number): TokenType {
    if (!this.artifacts) {
      return this.createEmptyToken()
    }

    return findCardById(this.artifacts, tokenId)
  }

  getMarkById(tokenId: number): TokenType {
    if (!this.marks) {
      return this.createEmptyToken()
    }

    return findCardById(this.marks, tokenId)
  }
}

export default DeckStore
export const deckStore = new DeckStore()
