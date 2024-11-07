import { shufflePlayers } from './shufflePlayers'

export const pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const players = shufflePlayers(totalPlayers)
  const selectedPlayers = Math.floor(Math.random() * 3) + 1

  return selectedPlayers === 1 ? [players[0]] : selectedPlayers === 2 ? [players[0], conjunction, players[1]] : [players[0], players[1], conjunction, players[2]]
}
