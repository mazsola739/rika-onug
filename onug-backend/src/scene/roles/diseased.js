export const diseased = (gameState) => ["diseased_kickoff_text"]

/* if (conditions.hasDiseasedPlayer(newGameState.players)) {
   const actualSceneRoleTokens = getTokensByOriginalIds(players, [32])
    return roles.diseased_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
  } */

//? INFO: Diseased - Gives either player to right or left a Mark of Disease whoever votes for either the marked or player loses
//! NO flipped card but shield
export const diseased_interaction = (gameState, tokens, title) => {}

export const diseased_response =  (gameState, token, selected_positions, title) => {}