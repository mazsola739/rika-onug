export const moveCardsButYourOwn = (cards, direction, currentPlayer) => {
  const playerCards = Object.fromEntries(Object.entries(cards).filter(([key]) => key.startsWith('player_')))

  const currentPlayerData = playerCards[currentPlayer]
  const movableCards = { ...playerCards }
  delete movableCards[currentPlayer]

  const otherPlayerKeys = Object.keys(movableCards)
  const totalPlayers = otherPlayerKeys.length

  const shiftAmount = direction === 'right' ? 1 : -1

  const shiftedCards = {}

  otherPlayerKeys.forEach((key, index) => {
    const newIndex = (index + shiftAmount + totalPlayers) % totalPlayers
    const newKey = otherPlayerKeys[newIndex]

    shiftedCards[newKey] = { ...movableCards[key] }
  })

  return {
    ...shiftedCards,
    [currentPlayer]: currentPlayerData
  }
}
