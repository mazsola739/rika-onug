export const nostradamus = (gameState) => ["nostradamus_kickoff_text"]

export const nostradamus_reaction = (nostradamusTeam) => [
  "nostradamus_teamstart_text",
  `nostradamus_team_${nostradamusTeam}_text`,
]

/* if (conditions.hasNostradamusPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.nostradamus_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
      if (conditions.hasNostradamusPlayer(newGameState.players)) {
       const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus_reaction_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
      } */
//TODO doppelganger same result as nostradamus
export const nostradamus_interaction = (gameState, tokens, title) => {}

export const nostradamus_response =  (gameState, token, selected_positions, title) => {}

