export const getVampirePlayerNumbersByMark = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.player_mark === 'mark_of_vampire') {
      result.push(player.player_number)
    }
  }

  return result
}
