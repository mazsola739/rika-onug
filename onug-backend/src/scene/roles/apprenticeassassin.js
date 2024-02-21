

const createApprenticeAssassin = (prefix) => (hasAssassin) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

export const apprenticeassassin = (gameState) => createApprenticeAssassin("apprenticeassassin")

export const doppelganger_apprenticeassassin = (gameState) => createApprenticeAssassin(
  "doppelganger_apprenticeassassin"
)

/* if (conditions.hasApprenticeAssassinPlayer) {
  tokens = getTokensByOriginalIds(players, [28])
  return roles.apprenticeassassin_interaction(newGameState, tokens, sceneTitle)
}

      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_apprenticeassassin_interaction(newGameState, tokens, sceneTitle)
      }*/

//TODO doppelganger
//? INFO: Apprentice Assassin - Wakes up to see who the Assassin is he can only win if the Assassin  dies. If there is no Assassin, he becomes the Assassin
//! NO flipped card but shield
export const apprenticeassassin_interaction = (gameState, tokens, title) => {}

export const apprenticeassassin_response =  (gameState, token, selected_positions, title) => {}
