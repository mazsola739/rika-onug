export const instigator = (gameState) => ["instigator_kickoff_text"]

/* if (conditions.hasInstigatorPlayer) {
    tokens = getTokensByOriginalIds(players, [34])
    return roles.instigator_interaction(newGameState, tokens, sceneTitle)
  } */
//? INFO: Instigator - Give any player (including herself) a Mark of the Traitor they only win if someone on their team dies
//! NO flipped card but shield
export const instigator_interaction = (gameState, tokens, title) => {}

export const instigator_response =  (gameState, token, selected_positions, title) => {}
