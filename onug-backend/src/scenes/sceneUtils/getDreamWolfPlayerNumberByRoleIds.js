export const getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 21 && player[token].card.player_mark !== 'mark_of_fear') {
      result.push(player.player_number)
    }
  }

  return result
}
