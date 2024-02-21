//TODO save which interaction!

const randomFamilyman = [
  "familyman_1pleft_text",
  "familyman_1pright_text",
  "familyman_eachside_text",
  "familyman_2pleft_text",
  "familyman_2pright_text",
  "familyman_3pleft_text",
  "familyman_3pright_text",
  "familyman_4pleft_text",
  "familyman_4pright_text",
  "familyman_2eachside_text",
]

export const familyman = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_familyman_kickoff_text"
    : "familyman_kickoff_text",
  getRandomItemFromArray(randomFamilyman),
  randomFamilyman.includes("1p")
    ? "familyman_is_end_text"
    : "familyman_are_end_text",
]

/* if (conditions.hasFamilyManPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.familyman_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

//TODO doppelganger 
//! wakes up!
export const familyman_interaction = (gameState, tokens, title) => {}

export const familyman_response =  (gameState, token, selected_positions, title) => {}
