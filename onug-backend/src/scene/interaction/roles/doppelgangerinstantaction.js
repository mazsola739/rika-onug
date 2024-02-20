const { roles } = require(".")
const { INTERACTION } = require("../../../constant/ws")
const { doppelgangerInstantActionsIds} = require("../constants")

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

exports.doppelganger_instant_action = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const { players } = newGameState

  tokens.forEach((token) => {
    const new_role_id = players[token]?.new_role_id

    if (!doppelgangerInstantActionsIds.includes(new_role_id)) return newGameState

    if (new_role_id === 2)  return roles.drunk(newGameState, [token], title)
    if (new_role_id === 8)  return roles.robber(newGameState, [token], title)
    if (new_role_id === 9)  return roles.seer(newGameState, [token], title)
    if (new_role_id === 11) return roles.troublemaker(newGameState, [token], title)
    if (new_role_id === 17) return roles.alphawolf(newGameState, [token], title)
    if (new_role_id === 18) return roles.apprenticeseer(newGameState, [token], title)
    if (new_role_id === 22) return roles.mysticwolf(newGameState, [token], title)
    if (new_role_id === 23) return roles.paranormalinvestigator(newGameState, [token], title)
    if (new_role_id === 25) return roles.sentinel(newGameState, [token], title)
    if (new_role_id === 26) return roles.villageidiot(newGameState, [token], title)
    if (new_role_id === 27) return roles.witch(newGameState, [token], title)
    if (new_role_id === 31) return roles.cupid(newGameState, [token], title)
    if (new_role_id === 32) return roles.diseased(newGameState, [token], title)
    if (new_role_id === 34) return roles.instigator(newGameState, [token], title)
    if (new_role_id === 55) return roles.thing(newGameState, [token], title)
    if (new_role_id === 56) return roles.detector(newGameState, [token], title)
    if (new_role_id === 57) return roles.drpeeker(newGameState, [token], title)
    if (new_role_id === 65) return roles.rapscallion(newGameState, [token], title)
    if (new_role_id === 66) return roles.robber(newGameState, [token], title)
    if (new_role_id === 68) return roles.troublemaker(newGameState, [token], title)
    if (new_role_id === 69) return roles.temptress(newGameState, [token], title)
    if (new_role_id === 70) return roles.witch(newGameState, [token], title)
    if (new_role_id === 85) return roles.thing(newGameState, [token], title)
  })
  return { ...newGameState, role_interactions }
}

exports.doppelganger_instant_action_response = (gameState, token, selected_positions, title) => {
  const new_role_id = gameState?.players?.[token]?.new_role_id

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

  if (new_role_id === 2)  return roles.drunk_response(newGameState, token, selected_positions, title)
  if (new_role_id === 8)  return roles.robber_response(newGameState, token, selected_positions, title)
  if (new_role_id === 9)  return roles.seer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 11) return roles.troublemaker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 17) return roles.alphawolf_response(newGameState, token, selected_positions, title)
  if (new_role_id === 18) return roles.apprenticeseer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 22) return roles.mysticwolf_response(newGameState, token, selected_positions, title)
  if (new_role_id === 23) return roles.paranormalinvestigator_response(newGameState, token, selected_positions, title)
  if (new_role_id === 25) return roles.sentinel_response(newGameState, token, selected_positions, title)
  if (new_role_id === 26) return roles.villageidiot_response(newGameState, token, selected_positions, title)
  if (new_role_id === 27) return roles.witch_response(newGameState, token, selected_positions, title)
  if (new_role_id === 31) return roles.cupid_response(newGameState, token, selected_positions, title)
  if (new_role_id === 32) return roles.diseased_response(newGameState, token, selected_positions, title)
  if (new_role_id === 34) return roles.instigator_response(newGameState, token, selected_positions, title)
  if (new_role_id === 55) return roles.thing_response(newGameState, token, selected_positions, title)
  if (new_role_id === 56) return roles.seer_response(newGameState, token, selected_positions, title)
  if (new_role_id === 57) return roles.drpeeker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 65) return roles.rapscallion_response(newGameState, token, selected_positions, title)
  if (new_role_id === 66) return roles.robber_response(newGameState, token, selected_positions, title)
  if (new_role_id === 68) return roles.troublemaker_response(newGameState, token, selected_positions, title)
  if (new_role_id === 69) return roles.temptress_response(newGameState, token, selected_positions, title)
  if (new_role_id === 70) return roles.witch_response(newGameState, token, selected_positions, title)
  if (new_role_id === 85) return roles.thing_response(newGameState, token, selected_positions, title)

  return newGameState
}
