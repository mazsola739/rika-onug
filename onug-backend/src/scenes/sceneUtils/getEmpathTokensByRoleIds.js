export const getEmpathTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card.player_role_id === 77 && player.card.player_original_id !== 1) {
      result.push(token)
    }
  }

  return result
}
