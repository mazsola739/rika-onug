import { emptyCard, emptyToken } from 'constant'
import { CardType, TokenType } from 'types'

const createEmptyCard = (): CardType => {
  return emptyCard
}

const createEmptyToken = (): TokenType => {
  return emptyToken
}

const findById = <T extends { id: number }>(
  list: T[],
  id: number
): T | undefined => {
  return list.find((item) => item.id === id)
}

export const deckStoreUtils = { createEmptyCard, createEmptyToken, findById }
