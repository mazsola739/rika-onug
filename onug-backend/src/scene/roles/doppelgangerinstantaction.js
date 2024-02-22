//@ts-check
import { doppelgangerInstantActionsIds } from '../../constant'
import { getAllPlayerTokens } from "../../utils/scene"
import * as roles from "./index"

//TODO rolesFromIds

const addVerboseOr = (rolesFromIds) => {
  if (rolesFromIds.length > 1) {
    rolesFromIds.splice(
      rolesFromIds.length - 1,
      0,
      "doppelganger_verbose_or_text"
    )
  }
  return rolesFromIds
}

export const doppelganger_instant_action = (gameState) => {
  const newGameState = { ...gameState }
  const narration =  [
    "doppelganger_verbose_intro_text",
    ...addVerboseOr(rolesFromIds), 
    "doppelganger_verbose_outro_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 1) {
    newGameState.players[token].scene_role_interaction.interaction = doppelganger_instant_action_interaction(newGameState, token)
   }
  })

  return newGameState
}

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

export const doppelganger_instant_action_interaction = (gameState, token) => {
  const newGameState = { ...gameState }
  
    const new_role_id = newGameState.players[token]?.new_role_id

    if (!doppelgangerInstantActionsIds.includes(new_role_id)) return {}

    if (new_role_id === 2)  return roles.drunk_response(newGameState, token)
    if (new_role_id === 8)  return roles.robber_response(newGameState, token)
    if (new_role_id === 9)  return roles.seer_response(newGameState, token)
    if (new_role_id === 11) return roles.troublemaker_response(newGameState, token)
    if (new_role_id === 17) return roles.alphawolf_response(newGameState, token)
    if (new_role_id === 18) return roles.apprenticeseer_response(newGameState, token)
    if (new_role_id === 22) return roles.mysticwolf_response(newGameState, token)
    if (new_role_id === 23) return roles.paranormalinvestigator_response(newGameState, token)
    if (new_role_id === 25) return roles.sentinel_response(newGameState, token)
    if (new_role_id === 26) return roles.villageidiot_response(newGameState, token)
    if (new_role_id === 27) return roles.witch_response(newGameState, token)
    if (new_role_id === 31) return roles.cupid_response(newGameState, token)
    if (new_role_id === 32) return roles.diseased_response(newGameState, token)
    if (new_role_id === 34) return roles.instigator_response(newGameState, token)
    if (new_role_id === 55) return roles.thing_response(newGameState, token)
    if (new_role_id === 56) return roles.seer_interaction(newGameState, token)
    if (new_role_id === 57) return roles.drpeeker_response(newGameState, token)
    if (new_role_id === 65) return roles.rapscallion_response(newGameState, token)
    if (new_role_id === 66) return roles.robber_response(newGameState, token)
    if (new_role_id === 68) return roles.troublemaker_response(newGameState, token)
    if (new_role_id === 69) return roles.temptress_response(newGameState, token)
    if (new_role_id === 70) return roles.witch_response(newGameState, token)
    if (new_role_id === 85) return roles.thing_response(newGameState, token)

    return {}
}

export const doppelganger_instant_action_response =  (gameState, token, selected_positions) => {
  const new_role_id = gameState.players[token]?.new_role_id

  if (!new_role_id) { //TODO
    ws.send(
      JSON.stringify({
        type: INTERACTION,
        message: ['no_night_action'], icon: 'night',
      })
    )
    return gameState
  }

  const newGameState = { ...gameState }

  if (new_role_id === 2)  return roles.drunk_response(newGameState, token, selected_positions)
  if (new_role_id === 8)  return roles.robber_response(newGameState, token, selected_positions)
  if (new_role_id === 9)  return roles.seer_response(newGameState, token, selected_positions)
  if (new_role_id === 11) return roles.troublemaker_response(newGameState, token, selected_positions)
  if (new_role_id === 17) return roles.alphawolf_response(newGameState, token, selected_positions)
  if (new_role_id === 18) return roles.apprenticeseer_response(newGameState, token, selected_positions)
  if (new_role_id === 22) return roles.mysticwolf_response(newGameState, token, selected_positions)
  if (new_role_id === 23) return roles.paranormalinvestigator_response(newGameState, token, selected_positions)
  if (new_role_id === 25) return roles.sentinel_response(newGameState, token, selected_positions)
  if (new_role_id === 26) return roles.villageidiot_response(newGameState, token, selected_positions)
  if (new_role_id === 27) return roles.witch_response(newGameState, token, selected_positions)
  if (new_role_id === 31) return roles.cupid_response(newGameState, token, selected_positions)
  if (new_role_id === 32) return roles.diseased_response(newGameState, token, selected_positions)
  if (new_role_id === 34) return roles.instigator_response(newGameState, token, selected_positions)
  if (new_role_id === 55) return roles.thing_response(newGameState, token, selected_positions)
  if (new_role_id === 56) return roles.seer_response(newGameState, token, selected_positions)
  if (new_role_id === 57) return roles.drpeeker_response(newGameState, token, selected_positions)
  if (new_role_id === 65) return roles.rapscallion_response(newGameState, token, selected_positions)
  if (new_role_id === 66) return roles.robber_response(newGameState, token, selected_positions)
  if (new_role_id === 68) return roles.troublemaker_response(newGameState, token, selected_positions)
  if (new_role_id === 69) return roles.temptress_response(newGameState, token, selected_positions)
  if (new_role_id === 70) return roles.witch_response(newGameState, token, selected_positions)
  if (new_role_id === 85) return roles.thing_response(newGameState, token, selected_positions)

  return {}
}
