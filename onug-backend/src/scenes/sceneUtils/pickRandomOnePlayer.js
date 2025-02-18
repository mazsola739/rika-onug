import { shufflePlayers } from '.'

export const pickRandomOnePlayer = numPlayers => {
  return shufflePlayers(numPlayers)[0]
}
