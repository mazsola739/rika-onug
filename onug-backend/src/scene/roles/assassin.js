const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

export const assassin = (gameState) => createAssassin("assassin")
export const doppelganger_assassin = (gameState) => createAssassin("doppelganger_assassin")

/* if (conditions.hasAssassinPlayer) { 
  tokens = getTokensByOriginalIds(players, [29])
  return roles.assassin_interaction(newGameState, tokens, sceneTitle)
}

      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_assassin_interaction(newGameState, tokens, sceneTitle)
      }*/

//TODO doppelganger
//! NO flipped card but shield
export const assassin_interaction = (gameState, tokens, title) => {}

export const assassin_response =  (gameState, token, selected_positions, title) => {}
