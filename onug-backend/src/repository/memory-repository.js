//@ts-check
import { logTrace } from '../log';

const gameStates = {}

export const upsertRoomState = async (state) => {
  logTrace('upsert game state in memory')
  if (!gameStates[state.room_id]) gameStates[state.room_id] = {}
  gameStates[state.room_id] = state
}

export const readGameState = async (room_id) => {
  logTrace('read game state from memory')

  return gameStates[room_id]
}
