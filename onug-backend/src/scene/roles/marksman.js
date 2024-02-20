export const marksman = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_marksman_kickoff_text"
    : "marksman_kickoff_text",
  "marksman_kickoff2_text",
];


//? INFO: Marksman - Looks at one other player's card and a different player's mark
//TODO doppelganger
export const marksman_interaction = (gameState, tokens, title) => {};

export const marksman_response_interaction =  (gameState, token, selected_positions, title) => {};
