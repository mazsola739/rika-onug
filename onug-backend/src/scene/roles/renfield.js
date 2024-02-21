export const renfield = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_renfield_kickoff_text"
    : "renfield_kickoff_text",
  "renfield_kickoff2_text",
]

/* if (conditions.hasRenfieldPlayer) {
  tokens = getTokensByOriginalIds(players, [38])
  return roles.renfield_interaction(newGameState, tokens, sceneTitle)
} */
//TODO doppelganger
//? INFO: Renfield - With their eyes closed, sees who Vampires gave Mark of the Vampire then gives himself Mark of the Bat
//! NO flipped card but shield
export const renfield_interaction = (gameState, tokens, title) => {}
