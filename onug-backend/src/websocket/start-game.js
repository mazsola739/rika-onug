const { REDIRECT } = require("../constant/ws")
const { logTrace } = require("../log")
const { validateRoom } = require("../validator")
const { repository } = require("../repository")
const { STAGES } = require("../constant/stage")
const { broadcast } = require("./connections")
const { upsertRoomState } = repository

exports.startGame = async (message) => {
  const { room_id, token } = message
  logTrace(`Everybody is ready, game started in: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

  const newRoomState = {
    ...gameState,
    stage: STAGES.GAME_PLAY,
  }

  // TODO validate player
  await upsertRoomState(newRoomState)

  const startGame = {
    type: REDIRECT,
    path: `/gameplay/${room_id}`
  }
  return broadcast(room_id, startGame)
}
