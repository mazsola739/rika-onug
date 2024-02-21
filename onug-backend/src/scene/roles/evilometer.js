export const evilometer = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_evilometer_kickoff_text"
    : "evilometer_kickoff_text",
  "evilometer_kickoff2_text",
]

/* if (conditions.hasEvilometerPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.evilometer_interaction(newGameState, tokens, sceneTitle)
} */

export const evilometer_interaction = (gameState, tokens, title) => {}
