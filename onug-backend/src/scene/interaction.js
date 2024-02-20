const { interactionHandler } = require("./interaction-handler")
const { logTrace, logDebug } = require("../log")

exports.interaction = gameState => {
  const { room_id } = gameState.room_id
  logTrace(`Interaction handling in room: ${room_id}`)

  let newGameState = { ...gameState }
  newGameState.role_interactions = []

  // Check if actual_scene is defined
  if (newGameState.actual_scene) {
    newGameState = interactionHandler(newGameState)
    logDebug(`__INTERACTION__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number} role_interaction: ${JSON.stringify(newGameState?.role_interactions)}`)
  } else {
    logDebug("No actual_scene found in gameState.")
    logDebug("gameState:", JSON.stringify(newGameState)) // Log the entire gameState object
  }

  return newGameState
}
