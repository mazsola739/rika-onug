const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

export const pickpocket = (gameState) => createPickpocket("pickpocket")
export const doppelganger_pickpocket = (gameState) => createPickpocket("doppelganger_pickpocket")

/* if (conditions.hasPickpocketPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.pickpocket_interaction(newGameState, tokens, sceneTitle)
} 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_pickpocket_interaction(newGameState, tokens, sceneTitle)
      }*/

//? INFO: Pickpocket - Swaps his mark for another player's mark and then looks at it
//TODO doppelganger
export const pickpocket_interaction = (gameState, tokens, title) => {}

export const pickpocket_response =  (gameState, token, selected_positions, title) => {}
