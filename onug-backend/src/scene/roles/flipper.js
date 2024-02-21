const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, "flipper_kickoff2_text"]

export const flipper = createFlipper("flipper")
export const doppelganger_flipper = createFlipper("doppelganger_flipper")

//? Same as revealer
/* if (conditions.hasFlipperPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [59])
  return roles.revealer_interaction(newGameState, tokens, sceneTitle)
}
if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [1])
  return roles.revealer_interaction(newGameState, tokens, sceneTitle)
} */