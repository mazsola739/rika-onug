const { INTERACTION } = require("../constant/ws")
const { logDebug, logError } = require("../log")
const { roles } = require("../scene/interaction/roles")
const { repository } = require('../repository')
const { websocketServerConnectionsPerRoom } = require("./connections")
const { doppelganger_instant_action_response } = require("../scene/interaction/roles/doppelgangerinstantaction")
const { readGameState, upsertRoomState } = repository

exports.interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_positions } = message
    const gameState = await readGameState(room_id)
    // TODO validate client request

    const newGameState = generateInteractionResponse(gameState, token, selected_positions, ws)

    newGameState?.role_interactions.forEach((role_interaction) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][role_interaction.token].send(JSON.stringify(role_interaction))
    })

    await upsertRoomState(newGameState)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

const generateInteractionResponse = (gameState, token, selected_positions, ws) => {
  const interaction_type = gameState?.players?.[token]?.player_history?.scene_title
  logError('HAHÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓ',interaction_type)
  if (!interaction_type) {
    ws.send(JSON.stringify({
      type: INTERACTION,
      message: 'nope'
    }))
    return gameState
  }

  const newGameState = {...gameState}
  //TODO add interaction_type everywhere
  if (interaction_type === "DOPPELGÄNGER_INSTANT_ACTION") return doppelganger_instant_action_response(newGameState, token, selected_positions)
  
  if (interaction_type === "ALPHA_WOLF")                  return roles.alphawolf_response(newGameState, token, selected_positions, 17)
  if (interaction_type === "ANNOYING_LAD")                return roles.thing_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "APPRENTICE_SEER")             return roles.apprenticeseer_response(newGameState, token, selected_positions)
  if (interaction_type === "DOPPELGÄNGER")                return roles.doppelganger_response(newGameState, token, selected_positions)
  if (interaction_type === "DOPPELGÄNGER_CURATOR")        return roles.curator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER_REVEALER")       return roles.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "CURATOR")                     return roles.curator_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "CUPID")                      return roles.cupid_response(newGameState, token, selected_positions)
  //if (interaction_type === "DETECTOR")                   return roles.detector_response(newGameState, token, selected_positions)
  //if (interaction_type === "DISEASED")                   return roles.diseased_response(newGameState, token, selected_positions)
  //if (interaction_type === "DR_PEEKER")                  return roles.drpeeker_response(newGameState, token, selected_positions)
  if (interaction_type === "DRUNK")                       return roles.drunk_response(newGameState, token, selected_positions)
  if (interaction_type === "FLIPPER")                     return roles.revealer_response(newGameState, token, selected_positions)
  //if (interaction_type === "INSTIGATOR")                 return roles.instigator_response(newGameState, token, selected_positions)
  if (interaction_type === "MYSTIC_WOLF")                 return roles.mysticwolf_response(newGameState, token, selected_positions)
  if (interaction_type === "PARANORMAL_INVESTIGATOR")     return roles.paranormalinvestigator_response(newGameState, token, selected_positions)
  //if (interaction_type === "RAPSCALLION")                return roles.rapscallion_response(newGameState, token, selected_positions)
  if (interaction_type === "REVEALER")                    return roles.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROBBER")                      return roles.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROLE_RETRIEVER")              return roles.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "SEER")                        return roles.seer_response(newGameState, token, selected_positions)  
  if (interaction_type === "SENTINEL")                    return roles.sentinel_response(newGameState, token, selected_positions)
  if (interaction_type === "SWITCHEROO")                  return roles.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "TEMPTRESS")                   return roles.temptress_response(newGameState, token, selected_positions)
  if (interaction_type === "THING")                       return roles.thing_response(newGameState, token, selected_positions)
  if (interaction_type === "TROUBLEMAKER")                return roles.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "VILLAGE_IDIOT")               return roles.villageidiot_response(newGameState, token, selected_positions)
  //if (interaction_type === "VOODOO_LOU")                  return roles.voodoolou_response(newGameState, token, selected_positions)
  if (interaction_type === "WITCH")                       return roles.witch_response(newGameState, token, selected_positions)
  if (interaction_type === "WEREWOLVES")                  return roles.werewolves_response(newGameState, token, selected_positions)

  return newGameState
}
