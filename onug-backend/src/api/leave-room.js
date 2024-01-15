const roomsData = require('../data/rooms.json')
const validator = require('../validator')
const { validateRoom } = validator
const { repository } = require('../repository')
const { logTrace } = require('../log')
const { upsertRoomState } = repository

exports.leaveRoom = async (req, res) => {
  const { body } = req
  logTrace(`Leave-room endpoint triggered with request body: ${JSON.stringify(body)}`)

  const { room_id, player_name } = body

  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) {
    return res.send(errors)
  }

  const playerIndex = gameState.players.findIndex(player => player.name === player_name)

  if (playerIndex === -1) {
    return res.send({ message: 'Player not found in the room.' })
  }

  if (gameState.players[playerIndex].admin && gameState.players.length > 1) {
    gameState.players[1].admin = true
  }

  const removedPlayer = gameState.players.splice(playerIndex, 1)[0]

  gameState.available_names.push(removedPlayer.name)

  if (gameState.players.length === 0) {
    const defaultRoom = roomsData.find(room => room.room_id === room_id)
    if (defaultRoom) {
      gameState.selected_cards = defaultRoom.selected_cards
      gameState.actions = []
      gameState.action_log = []
      gameState.players = []
      gameState.turn = 0
      gameState.closed = false
      gameState.available_names = [...defaultRoom.available_names]
    }
  }

  await upsertRoomState(gameState)

  return res.send({
    success: true,
    message: 'Successfully left the room',
    room_id,
    player_id: player_name,
  })
}
