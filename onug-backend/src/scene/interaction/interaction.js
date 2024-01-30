const { interactionHandler } = require("./interaction-handler")
const { logTrace, logDebug } = require("../../log")

exports.interaction = gameState => {
  const { room_id } = gameState.room_id
  logTrace(`Interaction handling in room: ${room_id}`)

  const newGameState = interactionHandler(gameState)

  /*
  {
    role_players: [token1, token2, token3],
    mark_of_fear: true/false,
    message: "ALPHAWOLF_INT_01",
    selectable_cards: [center1, p2],
    flipping_cards: [{P3:12}, {P4:11}]
    flipped_cards: [{P3:12}, {P4:11}],
    artifact: [P5],
    shield: [P1, P2],
  }
  */

  logDebug(`__INTERRACTION__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number} role_interaction: ${JSON.stringify(role_interactions, null, 2)}`)
  
  return newGameState
}
