export const getPlayerNeighborsByToken = (players, token, direction, amount) => {
  const totalPlayers = Object.keys(players).length
  const currentPlayerNumber = parseInt(players[token].player_number.split('_')[1], 10)
  const neighbors = []

  if (direction === 'left' || direction === 'both') {
    let prevNeighborNumber = currentPlayerNumber
    for (let i = 0; i < amount; i++) {
      prevNeighborNumber = ((prevNeighborNumber - 2 + totalPlayers) % totalPlayers) + 1
      neighbors.push(`player_${prevNeighborNumber}`)
    }
  }

  if (direction === 'right' || direction === 'both') {
    let nextNeighborNumber = currentPlayerNumber
    for (let i = 0; i < amount; i++) {
      nextNeighborNumber = (nextNeighborNumber % totalPlayers) + 1
      neighbors.push(`player_${nextNeighborNumber}`)
    }
  }

  return neighbors
}
