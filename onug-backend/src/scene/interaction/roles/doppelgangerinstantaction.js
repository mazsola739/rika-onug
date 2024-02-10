const { roles } = require(".")
const { doppelgangerInstantActionsIds, instantRoleIds } = require("../constants")

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 * */

exports.doppelganger_instant_action = (gameState, token) => {
  const new_role_id = gameState.players[token]?.role_history?.new_role_id

  if (!doppelgangerInstantActionsIds.includes(new_role_id)) return

  const newGameState = { ...gameState }
  const role_interactions = []

  const roleName = instantRoleIds[new_role_id]

  const roleHistory = {
    ...newGameState.actual_scene,
    instant_night_action: roleName,
  }

  newGameState.players[token].role_history = roleHistory

  newGameState.actual_scene.interaction = `Doppelganger instant night action for ${token}: ${roleName}`

  role_interactions.push({
    type: INTERACTION,
    title: "DOPPELGÄNGER_INSTANT_ACTION",
    token,
    message: "interaction_instant_night_action",
    shielded_players: newGameState.shield,
    new_role_id
  })

  newGameState.role_interactions = role_interactions

  if (new_role_id === 2)  return roles.drunk(newGameState, token)
  if (new_role_id === 8)  return roles.robber(newGameState, token)
  if (new_role_id === 9)  return roles.seer(newGameState, token)
  if (new_role_id === 11) return roles.troublemaker(newGameState, token)
  if (new_role_id === 17) return roles.alphawolf(newGameState, token)
  if (new_role_id === 18) return roles.apprenticeseer(newGameState, token)
  if (new_role_id === 22) return roles.mysticwolf(newGameState, token)
  if (new_role_id === 23) return roles.paranormalinvestigator(newGameState, token)
  if (new_role_id === 25) return roles.sentinel(newGameState, token)
  if (new_role_id === 26) return roles.villageidiot(newGameState, token)
  if (new_role_id === 27) return roles.witch(newGameState, token)
  if (new_role_id === 31) return roles.cupid(newGameState, token)
  if (new_role_id === 32) return roles.diseased(newGameState, token)
  if (new_role_id === 34) return roles.instigator(newGameState, token)
  if (new_role_id === 55) return roles.annoyinglad(newGameState, token)
  if (new_role_id === 56) return roles.detector(newGameState, token)
  if (new_role_id === 57) return roles.drpeeker(newGameState, token)
  if (new_role_id === 65) return roles.rapscallion(newGameState, token)
  if (new_role_id === 66) return roles.roleretriever(newGameState, token)
  if (new_role_id === 68) return roles.switcheroo(newGameState, token)
  if (new_role_id === 69) return roles.temptress(newGameState, token)
  if (new_role_id === 70) return roles.voodoolou(newGameState, token)
  if (new_role_id === 85) return roles.thing(newGameState, token)

  return newGameState
}

