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

exports.doppelganger_instant_action = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    
    const new_role_id = player?.player_history?.new_role_id
    if (!doppelgangerInstantActionsIds.includes(new_role_id)) return newGameState

    const roleName = instantRoleIds[new_role_id]

    const playerHistory = {
      ...newGameState.actual_scene,
      instant_night_action: roleName,
    }
    player.player_history = playerHistory
    player.player_history.copied_role = roleName

    const playerCard = player?.card
  
    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ["interaction_instant_night_action"],
        icon: 'night',
        instant_night_action: roleName,
        new_role_id,
        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
  newGameState.role_interactions = role_interactions
  
    if (new_role_id === 2)  return roles.drunk(newGameState, [token], "DRUNK")
    if (new_role_id === 8)  return roles.robber(newGameState, [token], "ROBBER")
    if (new_role_id === 9)  return roles.seer(newGameState, [token], "SEER")
    if (new_role_id === 11) return roles.troublemaker(newGameState, [token], "TROUBLEMAKER")
    if (new_role_id === 17) return roles.alphawolf(newGameState, [token], "ALPHA_WOLF")
    if (new_role_id === 18) return roles.apprenticeseer(newGameState, [token], "APPRENTICE_SEER")
    if (new_role_id === 22) return roles.mysticwolf(newGameState, [token], "MYSTIC_WOLF")
    if (new_role_id === 23) return roles.paranormalinvestigator(newGameState, [token], "PARANORMAL_INVESTIGATOR")
    if (new_role_id === 25) return roles.sentinel(newGameState, [token], "SENTINEL")
    if (new_role_id === 26) return roles.villageidiot(newGameState, [token], "VILLAGE_IDIOT")
    if (new_role_id === 27) return roles.witch(newGameState, [token], "WITCH")
    if (new_role_id === 31) return roles.cupid(newGameState, [token], "CUPID")
    if (new_role_id === 32) return roles.diseased(newGameState, [token], "DISEASED")
    if (new_role_id === 34) return roles.instigator(newGameState, [token], "INSTIGATOR")
    if (new_role_id === 55) return roles.thing(newGameState, [token], "ANNOYING_LAD")
    if (new_role_id === 56) return roles.detector(newGameState, [token], "DETECTOR")
    if (new_role_id === 57) return roles.drpeeker(newGameState, [token], "DR_PEEKER")
    if (new_role_id === 65) return roles.rapscallion(newGameState, [token], "RAPSCALLION")
    if (new_role_id === 66) return roles.robber(newGameState, [token], "ROLE_RETRIEVER")
    if (new_role_id === 68) return roles.troublemaker(newGameState, [token], "SWITCHEROO")
    if (new_role_id === 69) return roles.temptress(newGameState, [token], "TEMPTRESS")
    if (new_role_id === 70) return roles.witch(newGameState, [token], "VOODOO_LOU")
    if (new_role_id === 85) return roles.thing(newGameState, [token], "THING")
  })

  return newGameState
}

exports.doppelganger_instant_action_response = (gameState, token) => {
  const role = gameState?.players?.[token]?.player_history?.copied_role

  if (!role) {
    ws.send(
      JSON.stringify({
        type: INTERACTION,
        informations: { message: ['night', 'no_night_action'] },
      })
    )
    return gameState
  }

  const newGameState = {...gameState}

  if (role === "alphawolf")              return roles.alphawolf_response(newGameState, token, selected_positions, "ALPHA_WOLF")
  if (role === "annoyinglad")            return roles.thing_response(newGameState, token, selected_positions, "ANNOYING_LAD")
  if (role === "apprenticeseer")         return roles.apprenticeseer_response(newGameState, token, selected_positions, "APPRENTICE_SEER")
  if (role === "cupid")                  return roles.cupid_response(newGameState, token, selected_positions, "CUPID")
  if (role === "detector")               return roles.detector_response(newGameState, token, selected_positions, "DETECTOR")
  if (role === "diseased")               return roles.diseased_response(newGameState, token, selected_positions, "DISEASED")
  if (role === "drpeeker")               return roles.drpeeker_response(newGameState, token, selected_positions, "DR_PEEKER")
  if (role === "drunk")                  return roles.drunk_response(newGameState, token, selected_positions, "DRUNK")
  if (role === "instigator")             return roles.instigator_response(newGameState, token, selected_positions, "INSTIGATOR")
  if (role === "mysticwolf")             return roles.mysticwolf_response(newGameState, token, selected_positions, "MYSTIC_WOLF")
  if (role === "paranormalinvestigator") return roles.paranormalinvestigator_response(newGameState, token, selected_positions, "PARANORMAL_INVESTIGATOR")
  if (role === "rapscallion")            return roles.rapscallion_response(newGameState, token, selected_positions, "RAPSCALLION")
  if (role === "robber")                 return roles.robber_response(newGameState, token, selected_positions, "ROBBER")
  if (role === "roleretriever")          return roles.robber_response(newGameState, token, selected_positions, "ROLE_RETRIEVER")
  if (role === "seer")                   return roles.seer_response(newGameState, token, selected_positions, "SEER")
  if (role === "sentinel")               return roles.sentinel_response(newGameState, token, selected_positions, "SENTINEL")
  if (role === "switcheroo")             return roles.troublemaker_response(newGameState, token, selected_positions, "SWITCHEROO")
  if (role === "temptress")              return roles.temptress_response(newGameState, token, selected_positions, "TEMPTRESS")
  if (role === "thing")                  return roles.thing_response(newGameState, token, selected_positions, "THING")
  if (role === "troublemaker")           return roles.troublemaker_response(newGameState, token, selected_positions, "TROUBLEMAKER")
  if (role === "village_idiot")          return roles.villageidiot_response(newGameState, token, selected_positions, "VILLAGE_IDIOT")
  if (role === "voodoolou")             return roles.witch_response(newGameState, token, selected_positions, "VOODOO_LOU")
  if (role === "witch")                  return roles.witch_response(newGameState, token, selected_positions, "WITCH")

  return newGameState
}
