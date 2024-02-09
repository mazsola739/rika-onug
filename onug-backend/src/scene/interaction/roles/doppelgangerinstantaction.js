const { roles } = require(".")
const { INTERACTION } = require("../../../constant/ws")
const { logInfo } = require("../../../log")
const { doppelgangerInstantActionsIds, instantRoleIds } = require("../constants")

/**
 * * Doppelgänger instant night actions:
 * ? 1 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */
exports.doppelganger_instant_action = (gameState, new_role_id, token) => {
  if (new_role_id && doppelgangerInstantActionsIds.includes(gameState.players[token].role_history.new_role_id) === false) return gameState

  let newGameState = { ...gameState }

  const roleName = instantRoleIds[new_role_id]

  if (roleName && roles[roleName]) {
    logInfo(`Doppelganger instant night action: ${typeof roles[roleName]}`)
    newGameState = roles[roleName](newGameState)

    //! TODO how to communicate
    //TODO newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} started the next night action: ${}`
  }

  return newGameState
}

exports.doppelganger_instant_response = (gameState, token, selected_positions, ws) => {
/*   const generateInteractionResponse = (gameState, token, selected_positions, ws) => {
    const interaction_type = gameState?.players?.[token]?.role_history?.scene_title
    if (!interaction_type) {
      ws.send(JSON.stringify({
        type: INTERACTION,
        message: 'nope'
      }))
      return gameState
    }
  
    if (interaction_type === "ALPHA_WOLF")      return roles.alphawolf_response(gameState, token, selected_positions)
    if (interaction_type === "APPRENTICE_SEER") return roles.apprenticeseer_response(gameState, token, selected_positions)
    if (interaction_type === "DOPPELGÄNGER")    return roles.doppelganger_response(gameState, token, selected_positions)
    if (interaction_type === "DRUNK")           return roles.drunk_response(gameState, token, selected_positions)
    if (interaction_type === "MYSTIC_WOLF")     return roles.mysticwolf_response(gameState, token, selected_positions)
    if (interaction_type === "ROBBER")          return roles.robber_response(gameState, token, selected_positions)
    if (interaction_type === "SEER")            return roles.seer_response(gameState, token, selected_positions)  
    if (interaction_type === "TROUBLEMAKER")    return roles.troublemaker_response(gameState, token, selected_positions)
    if (interaction_type === "WEREWOLVES")      return roles.werewolves_response(gameState, token, selected_positions)
  
    return gameState
  } */

}