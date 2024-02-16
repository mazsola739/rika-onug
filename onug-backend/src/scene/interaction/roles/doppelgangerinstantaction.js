const { roles } = require(".")
const { INTERACTION } = require("../../../constant/ws")
const {doppelgangerInstantActionsIds, instantRoleIds} = require("../constants")

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

exports.doppelganger_instant_action = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const new_role_id = player?.role_history?.new_role_id
    if (!doppelgangerInstantActionsIds.includes(new_role_id)) return newGameState

    const roleName = instantRoleIds[new_role_id]

    const roleHistory = {
      ...newGameState.actual_scene,
      instant_night_action: roleName,
    }
    player.role_history = roleHistory

    newGameState.actual_scene.interaction = `Doppelganger instant night action for player_${player.player_number}: ${roleName}`
    newGameState.actual_scene.copied_role = roleName

    const playerCard = player?.card
  
    role_interactions.push({
      type: INTERACTION,
      title: "DOPPELGÄNGER_INSTANT_ACTION",
      token,
      message: "interaction_instant_night_action",
      instant_night_action: roleName,
      new_role_id,
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })
  
    newGameState.role_interactions = role_interactions
  
    if (new_role_id === 2)  return roles.drunk(newGameState, [token])
    if (new_role_id === 8)  return roles.robber(newGameState, [token], new_role_id)
    if (new_role_id === 9)  return roles.seer(newGameState, [token])
    if (new_role_id === 11) return roles.troublemaker(newGameState, [token])
    if (new_role_id === 17) return roles.alphawolf(newGameState, [token])
    if (new_role_id === 18) return roles.apprenticeseer(newGameState, [token])
    if (new_role_id === 22) return roles.mysticwolf(newGameState, [token])
    if (new_role_id === 23) return roles.paranormalinvestigator(newGameState, [token])
    if (new_role_id === 25) return roles.sentinel(newGameState, [token])
    if (new_role_id === 26) return roles.villageidiot(newGameState, [token])
    if (new_role_id === 27) return roles.witch(newGameState, [token])
    if (new_role_id === 31) return roles.cupid(newGameState, [token])
    if (new_role_id === 32) return roles.diseased(newGameState, [token])
    if (new_role_id === 34) return roles.instigator(newGameState, [token])
    if (new_role_id === 55) return roles.thing(newGameState, [token], new_role_id)
    if (new_role_id === 56) return roles.detector(newGameState, [token])
    if (new_role_id === 57) return roles.drpeeker(newGameState, [token])
    if (new_role_id === 65) return roles.rapscallion(newGameState, [token])
    if (new_role_id === 66) return roles.robber(newGameState, [token], new_role_id)
    if (new_role_id === 68) return roles.robber(newGameState, [token])
    if (new_role_id === 69) return roles.temptress(newGameState, [token])
    if (new_role_id === 70) return roles.voodoolou(newGameState, [token])
    if (new_role_id === 85) return roles.thing(newGameState, [token], new_role_id)
  })

  return newGameState
}

exports.doppelganger_instant_action_response = (gameState, token) => {
  const role = gameState?.players?.[token]?.role_history?.copied_role

  if (!role) {
    ws.send(
      JSON.stringify({
        type: INTERACTION,
        message: "nope",
      })
    )
    return gameState
  }

  const newGameState = {...gameState}

  //TODO remove ids if no needed
  if (role === "alphawolf")              return roles.alphawolf_response(newGameState, token, selected_positions, 17)
  if (role === "annoyinglad")            return roles.thing_response(newGameState, token, selected_positions, 55)
  if (role === "apprenticeseer")         return roles.apprenticeseer_response(newGameState, token, selected_positions, 18)
  if (role === "cupid")                  return roles.cupid_response(newGameState, token, selected_positions, 31)
  if (role === "detector")               return roles.detector_response(newGameState, token, selected_positions, 56)
  if (role === "diseased")               return roles.diseased_response(newGameState, token, selected_positions, 32)
  if (role === "drpeeker")               return roles.drpeeker_response(newGameState, token, selected_positions, 57)
  if (role === "drunk")                  return roles.drunk_response(newGameState, token, selected_positions, 2)
  if (role === "instigator")             return roles.instigator_response(newGameState, token, selected_positions, 34)
  if (role === "mysticwolf")             return roles.mysticwolf_response(newGameState, token, selected_positions, 22)
  if (role === "paranormalinvestigator") return roles.paranormalinvestigator_response(newGameState, token, selected_positions, 23)
  if (role === "rapscallion")            return roles.rapscallion_response(newGameState, token, selected_positions, 65)
  if (role === "robber")                 return roles.robber_response(newGameState, token, selected_positions, 8)
  if (role === "roleretriever")          return roles.robber_response(newGameState, token, selected_positions, 66)
  if (role === "seer")                   return roles.seer_response(newGameState, token, selected_positions, 9)
  if (role === "sentinel")               return roles.sentinel_response(newGameState, token, selected_positions, 25)
  if (role === "switcheroo")             return roles.troublemaker_response(newGameState, token, selected_positions, 68)
  if (role === "temptress")              return roles.temptress_response(newGameState, token, selected_positions, 69)
  if (role === "thing")                  return roles.thing_response(newGameState, token, selected_positions, 85)
  if (role === "troublemaker")           return roles.troublemaker_response(newGameState, token, selected_positions, 11)
  if (role === "village_idiot")          return roles.villageidiot_response(newGameState, token, selected_positions, 26)
  if (role === "voodoo_lou")             return roles.voodoolou_response(newGameState, token, selected_positions, 70)
  if (role === "witch")                  return roles.witch_response(newGameState, token, selected_positions, 27)

  return newGameState
}
