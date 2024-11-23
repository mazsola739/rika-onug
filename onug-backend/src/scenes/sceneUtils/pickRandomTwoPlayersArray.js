import { shufflePlayers } from '.'

export const pickRandomTwoPlayersArray = numPlayers => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}
