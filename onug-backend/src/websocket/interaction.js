import { INTERACTION } from '../constant/ws';
import { logDebug, logError } from '../log';
import { roleInteractions } from '../scene/roles/index';
import { repository } from '../repository';
import { websocketServerConnectionsPerRoom } from './connections';
import { doppelganger_instant_action_response } from '../scene/roles/doppelganger-interaction';
const { readGameState, upsertRoomState } = repository

export const interaction = async (ws, message) => {
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
};

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

  if (interaction_type === "DOPPELGÄNGER_INSTANT_ACTION") return doppelganger_instant_action_response(newGameState, token, selected_positions, interaction_type)
  
  if (interaction_type === "ALPHA_WOLF")              return roleInteractions.alphawolf_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ANNOYING_LAD")            return roleInteractions.thing_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "APPRENTICE_SEER")         return roleInteractions.apprenticeseer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER")            return roleInteractions.doppelganger_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER_CURATOR")    return roleInteractions.curator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER_REVEALER")   return roleInteractions.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "CURATOR")                 return roleInteractions.curator_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "CUPID")                  return roleInteractions.cupid_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "DETECTOR")               return roleInteractions.detector_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "DISEASED")               return roleInteractions.diseased_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "DR_PEEKER")              return roleInteractions.drpeeker_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DRUNK")                   return roleInteractions.drunk_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "FLIPPER")                 return roleInteractions.revealer_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "INSTIGATOR")             return roleInteractions.instigator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "MYSTIC_WOLF")             return roleInteractions.mysticwolf_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "PARANORMAL_INVESTIGATOR") return roleInteractions.paranormalinvestigator_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "RAPSCALLION")            return roleInteractions.rapscallion_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "REVEALER")                return roleInteractions.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROBBER")                  return roleInteractions.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROLE_RETRIEVER")          return roleInteractions.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "SEER")                    return roleInteractions.seer_response(newGameState, token, selected_positions, interaction_type)  
  if (interaction_type === "SENTINEL")                return roleInteractions.sentinel_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "SWITCHEROO")              return roleInteractions.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "TEMPTRESS")               return roleInteractions.temptress_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "THING")                   return roleInteractions.thing_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "TROUBLEMAKER")            return roleInteractions.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "VILLAGE_IDIOT")           return roleInteractions.villageidiot_response(newGameState, token, selected_positions, interaction_type)
  //if (interaction_type === "VOODOO_LOU")              return roleInteractions.voodoolou_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "WITCH")                   return roleInteractions.witch_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "WEREWOLVES")              return roleInteractions.werewolves_response(newGameState, token, selected_positions, interaction_type)

  return newGameState
}
