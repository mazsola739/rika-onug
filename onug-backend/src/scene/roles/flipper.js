const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, "flipper_kickoff2_text"]

export const flipper = createFlipper("flipper")
export const doppelganger_flipper = createFlipper("doppelganger_flipper")

//? Same as revealer
/* if (conditions.hasFlipperPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [59])
  return roles.revealer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasFlipperPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [1])
  return roles.revealer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */