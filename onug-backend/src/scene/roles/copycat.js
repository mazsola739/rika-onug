export const copycat = (gameState) => ["copycat_kickoff_text"]

/* if (conditions.hasCopycatPlayer(newGameState.players)) {
   const actualSceneRoleTokens = getTokensByOriginalIds(players, [30])
    return roles.copycat_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
  } */

//? INFO: Copycat - Looks at one card from the center and becomes that card. Does the action when called
//! At this moment copycat never see flipped or shielded cards, ripple different
export const copycat_interaction = (gameState, tokens, title) => {}

export const copycat_response = (gameState, token, selected_positions, title) => {}