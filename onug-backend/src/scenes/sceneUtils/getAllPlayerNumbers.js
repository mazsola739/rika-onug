export const getAllPlayerNumbers = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    result.push(player.player_number)
  }

  return result
}
