export const getLoversPlayerNumbersByMark = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.player_mark === 'mark_of_love') {
      result.push(player.player_number)
    }
  }

  return result
}
