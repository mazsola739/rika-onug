export const cow = (hasDoppelganger) => [
  hasDoppelganger ? "doppelganger_cow_kickoff_text" : "cow_kickoff_text",
  "cow_kickoff2_text",
]

/* if (conditions.hasCowPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.cow_interaction(newGameState, tokens, sceneTitle)
} */
//? INFO: Cow - Puts hand out in a fist when Aliens wake. If an Alien is sitting next to her, one must tap her fist
//! NEM KEL FEL
export const cow_interaction = (gameState, tokens, title) => {}
