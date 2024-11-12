export const getPlayerTokenByPlayerNumber = (players, playerNumber) => {
  for (const token in players) {
    if (players[token].player_number === playerNumber) {
      return token
    }
  }
  return null
}
