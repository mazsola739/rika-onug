import { shufflePlayers } from '.'

export const pickRandomTwoPlayers = (numPlayers, conjunction) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], conjunction, players[1]]
}
