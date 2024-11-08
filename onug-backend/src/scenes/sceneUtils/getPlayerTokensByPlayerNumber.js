export const getPlayerTokensByPlayerNumber = (players, playerNumbers) => {
  const result = []

  playerNumbers.forEach(playerNumber => {
    for (const token in players) {
      if (players[token].player_number === playerNumber) {
        result.push(token)
      }
    }
  })

  return result
}
