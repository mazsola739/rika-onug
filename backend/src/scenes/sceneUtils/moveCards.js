export const moveCards = (cards, direction, movablePlayers) => {
  const playerCards = Object.fromEntries(Object.entries(cards).filter(([key]) => key.startsWith('player_')))
  const staticCards = Object.fromEntries(Object.entries(playerCards).filter(([key]) => !movablePlayers.includes(key)))
  const movableCards = movablePlayers.map(player => playerCards[player])

  const shiftAmount = direction === 'right' ? 1 : -1

  const shiftedMovableCards = movablePlayers.reduce((acc, _player, index) => {
    const newIndex = (index + shiftAmount + movablePlayers.length) % movablePlayers.length
    acc[movablePlayers[newIndex]] = movableCards[index]
    return acc
  }, {})

  const updatedPlayerCards = { ...playerCards, ...staticCards, ...shiftedMovableCards }

  return updatedPlayerCards
}
