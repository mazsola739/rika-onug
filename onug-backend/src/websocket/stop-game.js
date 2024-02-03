const { REDIRECT } = require("../constant/ws")
const { logTrace } = require("../log")
const { validateRoom } = require("../validator")
const { repository } = require("../repository")
const { broadcast } = require("./connections")
const { stopGamePlay } = require("../screen-play")
const { upsertRoomState } = repository

exports.stopGame = async (message) => {
  const { room_id, token } = message
  logTrace(`game stop requested in: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room
  
  let newGameState = stopGamePlay(gameState)

  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await upsertRoomState(newGameState)

  const stopGame = {
    type: REDIRECT,
    path: `/room/${room_id}`
  }
  
  return broadcast(room_id, stopGame)
}
