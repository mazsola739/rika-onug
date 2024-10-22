import { empty_card, empty_token } from 'constant'
import { deckStore } from 'store'
import { CardType, TokenType } from 'types'

export const createEmptyCard = (): CardType => empty_card

export const createEmptyToken = (): TokenType => empty_token

export const determineTotalPlayers = (totalCharacters: number): number => {
    const { hasAlphawolf, hasTemptress } = deckStore
  
    let totalPlayers
    if (hasAlphawolf && hasTemptress) totalPlayers = totalCharacters - 5
    else if (hasAlphawolf || hasTemptress) totalPlayers = totalCharacters - 4
    else totalPlayers = totalCharacters - 3
  
    return Math.max(totalPlayers, 0)
  }