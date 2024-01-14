const { logTrace } = require('../log')

const gameStates = {}

const upsertRoomState = async (state) => {
  logTrace('upsert game state in memory')
  if (!gameStates[state.room_id]) gameStates[state.room_id] = {}
  gameStates[state.room_id] = state
}

const readGameState = async (room_id) => {
  logTrace('read game state from memory')

  return gameStates[room_id]
}

module.exports = {
  upsertRoomState,
  readGameState,
}
