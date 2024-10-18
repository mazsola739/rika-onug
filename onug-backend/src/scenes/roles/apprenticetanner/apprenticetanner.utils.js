export const getTannerPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 10) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}
