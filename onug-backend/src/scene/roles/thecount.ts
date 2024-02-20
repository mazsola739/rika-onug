const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount_narration = () => createTheCount("thecount");
export const doppelganger_thecount_narration = () => createTheCount("doppelganger_thecount");



//TODO doppelganger
//? INFO: The Count - Gives a non-Vampire the Mark of Fear this prevents that player from doing their night action
//! NO flipped card but shield
export const thecount_interaction = (gameState, tokens, title) => {};

export const thecount_response =  (gameState, token, selected_positions, title) => {};
