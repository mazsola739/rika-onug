const { validateRoom } = require("./validator")
const { sceneHandler } = require("./scene-handler")

//TODO RIPPLE

exports.narration = async (ws, message) => {
  const { room_id } = message
  logTrace(`Narration playing for players in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  return sceneHandler(gameState)
}
