const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount = (gameState) => createTheCount("thecount")
export const doppelganger_thecount = (gameState) => createTheCount("doppelganger_thecount")

/* if (conditions.hasTheCountPlayer) {
  tokens = getTokensByOriginalIds(players, [39])
  return roles.thecount_interaction(newGameState, tokens, sceneTitle)
}
 */

/* if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) {
  tokens = getTokensByOriginalIds(players, [1]) 
  return roles.doppelganger_thecount_interaction(newGameState, tokens, sceneTitle)
} */
//TODO doppelganger
//? INFO: The Count - Gives a non-Vampire the Mark of Fear this prevents that player from doing their night action
//! NO flipped card but shield
export const thecount_interaction = (gameState, tokens, title) => {}

export const thecount_response =  (gameState, token, selected_positions, title) => {}
