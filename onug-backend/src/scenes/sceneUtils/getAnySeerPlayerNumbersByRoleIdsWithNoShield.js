export const getAnySeerPlayerNumbersByRoleIdsWithNoShield = (players, shieldedCards) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if ((player.card.player_role_id === 9 || player.card.player_role_id === 18) && !shieldedCards.includes(player.player_number)) {
      result.push(player.player_number)
    }
  }

  return result
}
