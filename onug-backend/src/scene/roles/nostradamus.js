export const nostradamus_narration = () => ["nostradamus_kickoff_text"];

export const nostradamus_reaction = (nostradamusTeam) => [
  "nostradamus_teamstart_text",
  `nostradamus_team_${nostradamusTeam}_text`,
];


//TODO doppelganger same result as nostradamus
export const nostradamus_interaction = (gameState, tokens, title) => {};

export const nostradamus_response_interaction =  (gameState, token, selected_positions, title) => {};

