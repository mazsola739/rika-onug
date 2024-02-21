const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "gremlin_kickoff2_text"]

export const gremlin = createGremlin("gremlin")
export const doppelganger_gremlin = createGremlin("doppelganger_gremlin")

/* if (conditions.hasGremlinPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.gremlin_interaction(newGameState, tokens, sceneTitle)
} 
      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_gremlin_interaction(newGameState, tokens, sceneTitle)
      }*/

//? INFO: Gremlin - Swap any two player's (even himself) cards or marks (not both)
//TODO doppelganger
export const gremlin_interaction = (gameState, tokens, title) => {}

export const gremlin_response =  (gameState, token, selected_positions, title) => {}