const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

export const assassin_narration = () => createAssassin("assassin");
export const doppelganger_assassin_narration = () => createAssassin("doppelganger_assassin");


//TODO doppelganger
//! NO flipped card but shield
export const assassin_interaction = (gameState, tokens, title) => {};

export const assassin_response =  (gameState, token, selected_positions, title) => {};
