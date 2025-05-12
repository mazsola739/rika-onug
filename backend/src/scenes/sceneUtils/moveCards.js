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

export const moveCards = (gamestate, token, direction, movablePlayers) => {
  const playerCards = Object.fromEntries(Object.entries(gamestate.positions.card_positions).filter(([key]) => key.startsWith('player_')))
  const staticCards = Object.fromEntries(Object.entries(playerCards).filter(([key]) => !movablePlayers.includes(key)))
  const movableCards = movablePlayers.map(player => playerCards[player])

  const shiftAmount = direction === 'right' ? 1 : -1

  const shiftedMovableCards = movablePlayers.reduce((acc, _player, index) => {
    const newIndex = (index + shiftAmount + movablePlayers.length) % movablePlayers.length
    acc[movablePlayers[newIndex]] = movableCards[index]
    return acc
  }, {})
  const updatedPlayerCards = { ...playerCards, ...staticCards, ...shiftedMovableCards }
  gamestate.players[token].card_or_mark_action = true

  if (!gamestate.players[token].moved_card) {
    gamestate.positions.card_positions = {
      ...gamestate.positions.card_positions,
      ...updatedPlayerCards
    }
    Object.keys(gamestate.players).forEach(playerToken => {
      gamestate.players[playerToken].moved_card = true
    })
  }
  gamestate.players[token].card.player_card_id = 87

  return updatedPlayerCards
}
