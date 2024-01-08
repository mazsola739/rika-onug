import { emptyCard, emptyToken } from 'constant'
import { CardType, TokenType } from 'types'

const createEmptyCard = (): CardType => {
  return emptyCard
}

const createEmptyToken = (): TokenType => {
  return emptyToken
}

export const deckStoreUtils = { createEmptyCard, createEmptyToken }
