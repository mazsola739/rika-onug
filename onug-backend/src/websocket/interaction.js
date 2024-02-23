//@ts-check
import { SCENE } from '../constant/ws'
import { logDebug, logError } from '../log'
import * as roles from '../scene/roles'
import { readGameState, upsertRoomState } from '../repository'
import { websocketServerConnectionsPerRoom } from './connections'

export const interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_positions } = message
    const gameState = await readGameState(room_id)
    // TODO validate client request

    const newGameState = generateInteractionResponse(gameState, token, selected_positions, ws)

    newGameState?.scene_role_interactions.forEach((scene_role_interaction) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][scene_role_interaction.token].send(JSON.stringify(scene_role_interaction))
    })

    await upsertRoomState(newGameState)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

//TODO better idea?
const generateInteractionResponse = (gameState, token, selected_positions, ws) => {
  const interaction_type = gameState?.players?.[token]?.player_history?.scene_title

  if (!interaction_type) {
    ws.send(JSON.stringify({
      type: SCENE,
      message: 'nope'
    }))
    return gameState
  }

  const newGameState = {...gameState}
  const scene = []
  let interaction = {}

  if (interaction_type === "DOPPELGÄNGER_INSTANT_ACTION") interaction = roles.doppelganger_instant_action_response(newGameState, token, selected_positions, interaction_type)
  
  if (interaction_type === "ALPHA_WOLF")              interaction = roles.alphawolf_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ANNOYING_LAD")            interaction = roles.thing_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "APPRENTICE_SEER")         interaction = roles.apprenticeseer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER")            interaction = roles.doppelganger_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER_CURATOR")    interaction = roles.curator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DOPPELGÄNGER_REVEALER")   interaction = roles.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "CURATOR")                 interaction = roles.curator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "CUPID")                   interaction = roles.cupid_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DETECTOR")                interaction = roles.seer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DISEASED")                interaction = roles.diseased_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DR_PEEKER")               interaction = roles.drpeeker_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "DRUNK")                   interaction = roles.drunk_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "FLIPPER")                 interaction = roles.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "INSTIGATOR")              interaction = roles.instigator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "MYSTIC_WOLF")             interaction = roles.mysticwolf_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "PARANORMAL_INVESTIGATOR") interaction = roles.paranormalinvestigator_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "RAPSCALLION")             interaction = roles.rapscallion_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "REVEALER")                interaction = roles.revealer_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROBBER")                  interaction = roles.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "ROLE_RETRIEVER")          interaction = roles.robber_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "SEER")                    interaction = roles.seer_response(newGameState, token, selected_positions, interaction_type)  
  if (interaction_type === "SENTINEL")                interaction = roles.sentinel_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "SWITCHEROO")              interaction = roles.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "TEMPTRESS")               interaction = roles.temptress_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "THING")                   interaction = roles.thing_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "TROUBLEMAKER")            interaction = roles.troublemaker_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "VILLAGE_IDIOT")           interaction = roles.villageidiot_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "VOODOO_LOU")              interaction = roles.witch_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "WITCH")                   interaction = roles.witch_response(newGameState, token, selected_positions, interaction_type)
  if (interaction_type === "WEREWOLVES")              interaction = roles.werewolves_response(newGameState, token, selected_positions, interaction_type)

  scene.push({
    type: SCENE,
    title: interaction_type,
    token,
    interaction,
  })

  newGameState.scene = scene
  return newGameState
}
