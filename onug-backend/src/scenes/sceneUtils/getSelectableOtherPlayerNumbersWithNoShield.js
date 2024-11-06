export const getSelectableOtherPlayerNumbersWithNoShield = (players, token) => {
  const result = []

  Object.keys(players).forEach((playerToken) => {
    if (playerToken !== token && players[playerToken].card.shield !== true) {
      result.push(players[playerToken].player_number)
    }
  })

  return result
}
