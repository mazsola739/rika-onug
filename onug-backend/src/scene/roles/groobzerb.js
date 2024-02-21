export const groobzerb = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_groobzerb_kickoff_text"
    : "groobzerb_kickoff_text",
  "groobzerb_kickoff2_text",
]

/* if (conditions.hasGroobAndZerbPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.groobzerb_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

//? INFO: Groob - Wakes with other aliens. Wakes after to see Zerb. If Zerb is a player at vote, only wins if Zerb dies
export const groobzerb_interaction = (gameState, tokens, title) => {}

export const groobzerb_response =  (gameState, token, selected_positions, title) => {}
