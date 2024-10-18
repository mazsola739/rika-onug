export const getAnySeerPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card.player_role_id === 9 || player.card.player_role_id === 18) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}
