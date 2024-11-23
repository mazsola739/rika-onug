import { shufflePlayers } from '.'

export const pickRandomOnePlayer = numPlayers => shufflePlayers(numPlayers)[0]
