export const moveCardsButYourOwn = (cards, direction, currentPlayer) => {
  const playerCards = Object.fromEntries(
    Object.entries(cards)
      .filter(([key]) => key.startsWith("player_"))
  )

  const movableCards = { ...playerCards }
  const currentPlayerData = movableCards[currentPlayer]
  delete movableCards[currentPlayer]

  const shiftAmount = direction === 'right' ? 1 : Object.keys(movableCards).length - 1

  const shiftedCards = {}
  Object.keys(movableCards).forEach((key, index) => {
    const newIndex = (index + shiftAmount) % Object.keys(movableCards).length
    shiftedCards[`player_${newIndex + 2}`] = {
      mark: cards[`player_${newIndex + 2}`].mark
    }
    shiftedCards[`player_${newIndex + 2}`].card = movableCards[key].card
  })

  const updatedPlayerCards = { ...shiftedCards, [currentPlayer]: currentPlayerData }

  return updatedPlayerCards
}
