import { shufflePlayers } from '.'

export const pickRandomTwoPlayers = numPlayers => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}
