const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "gremlin_kickoff2_text"]

export const gremlin = createGremlin("gremlin")
export const doppelganger_gremlin = createGremlin("doppelganger_gremlin")

/* if (conditions.hasGremlinPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.gremlin_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} 
      if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasGremlinPlayer(newGameState.players)) {
       const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_gremlin_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
      }*/

//? INFO: Gremlin - Swap any two player's (even himself) cards or marks (not both)
//TODO doppelganger
export const gremlin_interaction = (gameState, tokens, title) => {}

export const gremlin_response =  (gameState, token, selected_positions, title) => {}