export const marksman = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_marksman_kickoff_text"
    : "marksman_kickoff_text",
  "marksman_kickoff2_text",
]

/* if (conditions.hasMarksmanPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.marksman_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */
//? INFO: Marksman - Looks at one other player's card and a different player's mark
//TODO doppelganger
export const marksman_interaction = (gameState, tokens, title) => {}

export const marksman_response =  (gameState, token, selected_positions, title) => {}
