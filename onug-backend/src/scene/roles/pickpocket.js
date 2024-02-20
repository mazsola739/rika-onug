const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

export const pickpocket_narration = () => createPickpocket("pickpocket");
export const doppelganger_pickpocket_narration = () => createPickpocket("doppelganger_pickpocket");


//? INFO: Pickpocket - Swaps his mark for another player's mark and then looks at it
//TODO doppelganger
export const pickpocket_interaction = (gameState, tokens, title) => {};

export const pickpocket_response_interaction =  (gameState, token, selected_positions, title) => {};
