const { validateRoom } = require("./validator")
const { interactionHandler } = require("./interaction-handler")


exports.narration = async (ws, message) => {
  const { room_id } = message
  logTrace(`Interaction playing for players in room: ${room_id}`)
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  return interactionHandler(gameState)
}
