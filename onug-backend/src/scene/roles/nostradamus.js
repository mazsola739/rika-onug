export const nostradamus = (gameState) => ["nostradamus_kickoff_text"]

export const nostradamus_reaction = (nostradamusTeam) => [
  "nostradamus_teamstart_text",
  `nostradamus_team_${nostradamusTeam}_text`,
]

/* if (conditions.hasNostradamusPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.nostradamus_interaction(newGameState, tokens, sceneTitle)
}
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus_reaction_interaction(newGameState, tokens, sceneTitle)
      } */
//TODO doppelganger same result as nostradamus
export const nostradamus_interaction = (gameState, tokens, title) => {}

export const nostradamus_response =  (gameState, token, selected_positions, title) => {}

