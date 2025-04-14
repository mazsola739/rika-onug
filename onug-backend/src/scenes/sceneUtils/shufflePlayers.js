export const shufflePlayers = totalPlayers => {
  const players = Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`)

  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[players[i], players[j]] = [players[j], players[i]]
  }

  return players
}
