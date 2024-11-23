export const getAnyHigherOrLowerPlayerNumbersByToken = (players, token, higherOrLower) => {
  const playerNumber = parseInt(players[token].player_number.replace('player_', ''), 10)
  const result = {}

  if (higherOrLower === 'lower') {
    for (let i = playerNumber - 1; i >= 1; i--) {
      result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
    }
  } else if (higherOrLower === 'higher') {
    const totalPlayers = Object.keys(players).length
    for (let i = playerNumber + 1; i <= totalPlayers; i++) {
      result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
    }
  }

  return result
}
