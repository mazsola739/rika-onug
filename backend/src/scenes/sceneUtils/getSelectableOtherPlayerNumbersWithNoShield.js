export const getSelectableOtherPlayerNumbersWithNoShield = (players, token) => {
  const result = []
  //!shieldedCards.includes(player.player_number)
  Object.keys(players).forEach(playerToken => {
    if (playerToken !== token && players[playerToken].shield !== true) {
      result.push(players[playerToken].player_number)
    }
  })

  return result
}
