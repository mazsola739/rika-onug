const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest_narration = () => createPriest("priest");
export const doppelganger_priest_narration = () => createPriest("doppelganger_priest");


//? INFO: Priest - Swaps his mark and one other player's mark with a Mark of Clarity. which purge other Marks)
//TODO doppelganger
export const priest_interaction = (gameState, tokens, title) => {};

export const priest_response_interaction =  (gameState, token, selected_positions, title) => {};