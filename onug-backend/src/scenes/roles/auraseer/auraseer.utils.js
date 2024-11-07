export const getPlayerNumbersWithCardOrMarkActionTrue = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card_or_mark_action === true) {
      result.push(player.player_number)
    }
  }

  return result
}
