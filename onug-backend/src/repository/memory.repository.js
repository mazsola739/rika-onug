import { logTrace } from '../log'

const gamestates = {}

export const upsertRoomState = async state => {
  logTrace('upsert gamestate in memory')
  if (!gamestates[state.room_id]) gamestates[state.room_id] = {}
  gamestates[state.room_id] = state
}

export const readGamestate = async room_id => {
  logTrace('read gamestate from memory')

  return gamestates[room_id]
}
