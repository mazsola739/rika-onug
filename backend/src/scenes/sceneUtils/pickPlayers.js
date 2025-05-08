export const shufflePlayers = totalPlayers => {
  const players = Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}`)

  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[players[i], players[j]] = [players[j], players[i]]
  }

  return players
}

export const pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const players = shufflePlayers(totalPlayers)
  const numPlayersToPick = Math.floor(Math.random() * 3) + 1

  if (numPlayersToPick === 1) {
    return [players[0]]
  } else if (numPlayersToPick === 2) {
    return [players[0], conjunction, players[1]]
  } else {
    return [players[0], players[1], conjunction, players[2]]
  }
}

export const pickRandomTwoPlayersArray = numPlayers => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}

export const pickRandomTwoPlayers = numPlayers => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}

export const pickRandomOnePlayer = numPlayers => {
  return shufflePlayers(numPlayers)[0]
}