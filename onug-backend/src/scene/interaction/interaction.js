const { interactionHandler } = require("./interaction-handler")
const { logTrace, logDebug } = require("../../log")

exports.interaction = gameState => {
  const { room_id } = gameState.room_id
  logTrace(`Interaction handling in room: ${room_id}`)

  const newGameState = {...gameState}
  
  /*
  {
    role_players: [token1, token2, token3],
    mark_of_fear: true/false,
    message: "ALPHAWOLF_INT_01",
    selectable_cards: [center1, p2],
    flipping_cards: [{P3:12}, {P4:11}],
    flipped: [{P3:12}, {P4:11}],
    artifact: [P5],
    shield: [P1, P2],
  }
  */

  //TODO fix role actions error
  const role_interactions = interactionHandler(newGameState)
  
  newGameState.role_interactions = role_interactions

  logDebug(`__INTERRACTION__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number} role_interaction: ${JSON.stringify(role_interactions)}`)
  
  return newGameState
}
