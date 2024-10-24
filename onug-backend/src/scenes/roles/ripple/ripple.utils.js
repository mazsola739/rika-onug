import { shufflePlayers } from '../../sceneUtils'

export const pickRandomOnePlayer = numPlayers => shufflePlayers(numPlayers)[0]

export const pickRandomTwoPlayers = (numPlayers, conjunction) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], conjunction, players[1]]
}

export const pickRandomTwoPlayersArray = numPlayers => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}
