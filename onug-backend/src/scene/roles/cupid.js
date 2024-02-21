export const cupid = (gameState) => ["cupid_kickoff_text"]

/* if (conditions.hasCupidPlayer(newGameState.players)) {
   const actualSceneRoleTokens = getTokensByOriginalIds(players, [31])
    return roles.cupid_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
  } */
//? INFO: Cupid - Gives any two players (including herself) a Mark of Love if one of them dies so does the other
//! NO flipped card but shield
export const cupid_interaction = (gameState, tokens, title) => {}

export const cupid_response =  (gameState, token, selected_positions, title) => {}