const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest = (gameState) => createPriest("priest")
export const doppelganger_priest = (gameState) => createPriest("doppelganger_priest")

/* if (conditions.hasPriestPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [37])
  return roles.priest_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}

if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasPriestPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.doppelganger_priest_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */
//? INFO: Priest - Swaps his mark and one other player's mark with a Mark of Clarity. which purge other Marks)
//TODO doppelganger
export const priest_interaction = (gameState, tokens, title) => {}

export const priest_response =  (gameState, token, selected_positions, title) => {}