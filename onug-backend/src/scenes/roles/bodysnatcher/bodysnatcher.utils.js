export const getAnyOtherPlayersByToken = (players, token) => {
  const result = {}

  for (const player in players) {
      if (player !== token) {
          result[player] = players[player]
      }
  }

  return result
}