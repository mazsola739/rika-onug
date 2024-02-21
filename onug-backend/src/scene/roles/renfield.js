export const renfield = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_renfield_kickoff_text"
    : "renfield_kickoff_text",
  "renfield_kickoff2_text",
]

/* if (conditions.hasRenfieldPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [38])
  return roles.renfield_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */
//TODO doppelganger
//? INFO: Renfield - With their eyes closed, sees who Vampires gave Mark of the Vampire then gives himself Mark of the Bat
//! NO flipped card but shield
export const renfield_interaction = (gameState, tokens, title) => {}
