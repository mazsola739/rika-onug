const { roles } = require("./index")
const { INTERACTION } = require("../../../constant/ws")
const { logInfo } = require("../../../log")
const { doppelgangerInstantActionsIds, instantRoleIds } = require("../constants")

/**
 * * Doppelgänger instant night actions: 
 * ? 1 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf, 
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased, 
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever, 
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing 
 * */
exports.doppelganger_instant_action = (gameState, new_role_id, token, ws) => {
  if (doppelgangerInstantActionsIds.includes(gameState.players[token].role_history.new_role_id) === false) return gameState
    
  let newGameState = { ...gameState }

  const roleName = instantRoleIds[new_role_id];
  
  if (roleName && roles[roleName]) {
    logInfo(`Doppelganger instant night action: ${typeof roles[roleName]}`)
    newGameState = roles[roleName](newGameState)

    ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY night action started',
    }))
  }

  return newGameState;
}
