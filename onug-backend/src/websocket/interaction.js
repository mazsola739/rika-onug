//@ts-check
import { logDebug, logError } from '../log'
import { readGameState, upsertRoomState } from '../repository'
import { doppelganger_instant_action_response, alphawolf_response, thing_response, apprenticeseer_response, doppelganger_response, curator_response, revealer_response, cupid_response, seer_response, diseased_response, drpeeker_response, drunk_response, instigator_response, mysticwolf_response, paranormalinvestigator_response, rapscallion_response, robber_response, sentinel_response, troublemaker_response, temptress_response, villageidiot_response, witch_response, werewolves_response } from '../scene/roles'
import { websocketServerConnectionsPerRoom } from './connections'

export const interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, answer } = message
    const gameState = await readGameState(room_id)
    // TODO validate client request

    const newGameState = generateInteractionResponse(gameState, token, selected_card_positions, ws, answer)

    newGameState?.scene.forEach((item) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][item.token].send(JSON.stringify(item))
    })
    
    await upsertRoomState(newGameState)
  } catch (error) {
    logError(error)
    logError(JSON.stringify(error?.stack))
  }
}

export const generateInteractionResponse = (gameState, token, selected_card_positions, ws, answer) => {
  const interaction_type = gameState.players[token]?.player_history?.scene_title

let newGameState = {...gameState}
//TODO check all response
  switch (interaction_type) {
      case "DOPPELGÄNGER_INSTANT_ACTION":
          newGameState = doppelganger_instant_action_response(gameState, token, selected_card_positions, answer, interaction_type)
          break
      case "ALPHA_WOLF":
          newGameState = alphawolf_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "ANNOYING_LAD":
          newGameState = thing_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "APPRENTICE_SEER":
          newGameState = apprenticeseer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DOPPELGÄNGER":
          newGameState = doppelganger_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DOPPELGÄNGER_CURATOR":
          newGameState = curator_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DOPPELGÄNGER_REVEALER":
          newGameState = revealer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "CURATOR":
          newGameState = curator_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "CUPID":
          newGameState = cupid_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DETECTOR":
          newGameState = seer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DISEASED":
          newGameState = diseased_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DR_PEEKER":
          newGameState = drpeeker_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "DRUNK":
          newGameState = drunk_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "FLIPPER":
          newGameState = revealer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "INSTIGATOR":
          newGameState = instigator_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "MYSTIC_WOLF":
          newGameState = mysticwolf_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "PARANORMAL_INVESTIGATOR":
          newGameState = paranormalinvestigator_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "RAPSCALLION":
          newGameState = rapscallion_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "REVEALER":
          newGameState = revealer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "ROBBER":
          newGameState = robber_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "ROLE_RETRIEVER":
          newGameState = robber_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "SEER":
          newGameState = seer_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "SENTINEL":
          newGameState = sentinel_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "SWITCHEROO":
          newGameState = troublemaker_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "TEMPTRESS":
          newGameState = temptress_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "THING":
          newGameState = thing_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "TROUBLEMAKER":
          newGameState = troublemaker_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "VILLAGE_IDIOT":
          newGameState = villageidiot_response(gameState, token, answer, interaction_type)
          break
      case "VOODOO_LOU":
          newGameState = witch_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "WITCH":
          newGameState = witch_response(gameState, token, selected_card_positions, interaction_type)
          break
      case "WEREWOLVES":
          newGameState = werewolves_response(gameState, token, selected_card_positions, interaction_type)
          break
      default:

          break
  }

  return newGameState
}

