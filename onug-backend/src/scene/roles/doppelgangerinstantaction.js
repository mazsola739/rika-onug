//const instantRoles = getRolesNames(selectedCards, doppelgangerInstantActionsIds, instantRoleIds)
//TODO

export const doppelganger_instant_action = (rolesFromIds) => [
  "doppelganger_verbose_intro_text",
  ...addVerboseOr(rolesFromIds),
  "doppelganger_verbose_outro_text",
]

/* if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
  tokens = getTokensByOriginalIds(newGameState.players, [1])
  return doppelganger_instant_action_interaction(newGameState, tokens, sceneTitle)
}
 */
import { roleInteractions } from './index'
import { INTERACTION } from '../../constant/ws'
import { doppelgangerInstantActionsIds } from '../constants'

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

export const doppelganger_instant_action_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []


  tokens.forEach((token) => {
    const new_role_id = newGameState.players[token]?.new_role_id

    if (!doppelgangerInstantActionsIds.includes(new_role_id)) return newGameState

    if (new_role_id === 2)  return roleInteractions.drunk(newGameState, [token], title)
    if (new_role_id === 8)  return roleInteractions.robber(newGameState, [token], title)
    if (new_role_id === 9)  return roleInteractions.seer(newGameState, [token], title)
    if (new_role_id === 11) return roleInteractions.troublemaker(newGameState, [token], title)
    if (new_role_id === 17) return roleInteractions.alphawolf(newGameState, [token], title)
    if (new_role_id === 18) return roleInteractions.apprenticeseer(newGameState, [token], title)
    if (new_role_id === 22) return roleInteractions.mysticwolf(newGameState, [token], title)
    if (new_role_id === 23) return roleInteractions.paranormalinvestigator(newGameState, [token], title)
    if (new_role_id === 25) return roleInteractions.sentinel(newGameState, [token], title)
    if (new_role_id === 26) return roleInteractions.villageidiot(newGameState, [token], title)
    if (new_role_id === 27) return roleInteractions.witch(newGameState, [token], title)
    if (new_role_id === 31) return roleInteractions.cupid(newGameState, [token], title)
    if (new_role_id === 32) return roleInteractions.diseased(newGameState, [token], title)
    if (new_role_id === 34) return roleInteractions.instigator(newGameState, [token], title)
    if (new_role_id === 55) return roleInteractions.thing(newGameState, [token], title)
    if (new_role_id === 56) return roleInteractions.detector(newGameState, [token], title)
    if (new_role_id === 57) return roleInteractions.drpeeker(newGameState, [token], title)
    if (new_role_id === 65) return roleInteractions.rapscallion(newGameState, [token], title)
    if (new_role_id === 66) return roleInteractions.robber(newGameState, [token], title)
    if (new_role_id === 68) return roleInteractions.troublemaker(newGameState, [token], title)
    if (new_role_id === 69) return roleInteractions.temptress(newGameState, [token], title)
    if (new_role_id === 70) return roleInteractions.witch(newGameState, [token], title)
    if (new_role_id === 85) return roleInteractions.thing(newGameState, [token], title)
  })
  return { ...newGameState, scene_role_interactions }
}

export const doppelganger_instant_action_response =  (gameState, token, selected_positions, title) => {
  const new_role_id = gameState.players[token]?.new_role_id

  if (!new_role_id) {
    ws.send(
      JSON.stringify({
        type: INTERACTION,
        message: ['no_night_action'], icon: 'night',
      })
    )
    return gameState
  }

  const newGameState = { ...gameState }

  if (new_role_id === 2)  return roleInteractions.drunk_response(newGameState, token, selected_positions, title)
  if (new_role_id === 8)  return roleInteractions.robber_response(newGameState, token, selected_positions, title)
  if (new_role_id === 9)  return roleInteractions.seer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 11) return roleInteractions.troublemaker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 17) return roleInteractions.alphawolf_response(newGameState, token, selected_positions, title)
  if (new_role_id === 18) return roleInteractions.apprenticeseer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 22) return roleInteractions.mysticwolf_response(newGameState, token, selected_positions, title)
  if (new_role_id === 23) return roleInteractions.paranormalinvestigator_response(newGameState, token, selected_positions, title)
  if (new_role_id === 25) return roleInteractions.sentinel_response(newGameState, token, selected_positions, title)
  if (new_role_id === 26) return roleInteractions.villageidiot_response(newGameState, token, selected_positions, title)
  if (new_role_id === 27) return roleInteractions.witch_response(newGameState, token, selected_positions, title)
  if (new_role_id === 31) return roleInteractions.cupid_response(newGameState, token, selected_positions, title)
  if (new_role_id === 32) return roleInteractions.diseased_response(newGameState, token, selected_positions, title)
  if (new_role_id === 34) return roleInteractions.instigator_response(newGameState, token, selected_positions, title)
  if (new_role_id === 55) return roleInteractions.thing_response(newGameState, token, selected_positions, title)
  if (new_role_id === 56) return roleInteractions.seer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 57) return roleInteractions.drpeeker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 65) return roleInteractions.rapscallion_response(newGameState, token, selected_positions, title)
  if (new_role_id === 66) return roleInteractions.robber_response(newGameState, token, selected_positions, title)
  if (new_role_id === 68) return roleInteractions.troublemaker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 69) return roleInteractions.temptress_response(newGameState, token, selected_positions, title)
  if (new_role_id === 70) return roleInteractions.witch_response(newGameState, token, selected_positions, title)
  if (new_role_id === 85) return roleInteractions.thing_response(newGameState, token, selected_positions, title)

  return newGameState
}
