export const squire = (hasDoppelganger) => [
  hasDoppelganger ? "doppelganger_squire_kickoff_text" : "squire_kickoff_text",
  "squire_kickoff2_text",
]

/* if (conditions.hasSquirePlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.squire_interaction(newGameState, tokens, sceneTitle)
} */
//? INFO: Squire - All Werewolf team (not Minion/Squire) stick up their thumb for him to see, who may look at their cards
export const squire_interaction = (gameState, tokens, title) => {}

export const squire_response =  (gameState, token, selected_positions, title) => {}
