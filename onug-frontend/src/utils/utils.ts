import { CardJson, TablePlayerCard } from 'types'

export const areAnyCardSelectedById = (selectedCards: CardJson[], cardIds: number[]): boolean =>
  cardIds.some(cardId => isCardSelectedById(selectedCards, cardId))

export const findCardById = <T extends { id: number }>(list: T[], id: number): T | undefined => {
  return list.find(item => item.id === id)
}

export const isCardSelectedById = (selectedCards: CardJson[], cardId: number): boolean => selectedCards.some(card => card.id === cardId)

export const checkCardPresence = (cards: CardJson[], cardId: number): boolean => cards.some(card => card.id === cardId)

export const capitalize = (string: string) => string && string[0].toUpperCase() + string.slice(1).toLowerCase()

export const splitCardsToTable = (tablePlayerCards: TablePlayerCard[], tablePlayerCard: TablePlayerCard) => {
  const playerNumber = Number(`${tablePlayerCard.position}`.replace('player_', ''))
  const playerIndex = playerNumber - 1

  const newTablePlayerCards = [...tablePlayerCards.slice(playerIndex), ...tablePlayerCards.slice(0, playerIndex)]

  const remainingTablePlayerCards = newTablePlayerCards.slice(1)

  if (remainingTablePlayerCards.length === 2) {
    const [rightCard, leftCard] = remainingTablePlayerCards
    return {
      right: [rightCard],
      middle: [],
      left: [leftCard],
      ownCard: newTablePlayerCards[0]
    }
  }

  const third = Math.floor(remainingTablePlayerCards.length / 3)
  const right = remainingTablePlayerCards.slice(0, third).reverse()
  const left = remainingTablePlayerCards.slice(-third)
  const middle = remainingTablePlayerCards.slice(third, -third).reverse()

  return { right, middle, left, ownCard: newTablePlayerCards[0] }
}
