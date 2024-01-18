const roomsData = require('../data/rooms.json')
const { repository } = require("../repository")
const { upsertRoomState, readGameState } = repository
const { logTrace } = require('../log')
const { LEAVE_ROOM } = require('../constant/ws')

exports.leaveRoom = async (ws, message) => {
  logTrace(`leave-room requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)

  const player = gameState.players[token]

  if (!player) {
    return ws.send(JSON.stringify({
      type: LEAVE_ROOM,
      errors: ['Player not found in the room.'],
      success: false }))
  }

  const playerTokens = Object.keys(gameState.players)

  if (player.admin && playerTokens.length > 1) {
    gameState.players[playerTokens[1]].admin = true
  }

  gameState.available_names.push(player.name)
  delete gameState.players[token];


  if (playerTokens.length === 1) { 
    const defaultRoom = roomsData.find(room => room.room_id === room_id)
    if (defaultRoom) {
      gameState.selected_cards = defaultRoom.selected_cards
      gameState.actions = []
      gameState.action_log = []
      gameState.players = {}
      gameState.turn = 0
      gameState.closed = false
      gameState.available_names = [...defaultRoom.available_names]
      delete gameState.center_cards
    }
  }

  await upsertRoomState(gameState)

  return ws.send(JSON.stringify({
    type: LEAVE_ROOM,
    success: true,
    message: 'Successfully left the room',
    room_id,
  }))
}