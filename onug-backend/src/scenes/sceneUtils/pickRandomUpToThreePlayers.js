import { shufflePlayers } from './shufflePlayers'

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
