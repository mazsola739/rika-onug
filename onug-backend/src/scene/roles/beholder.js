export const beholder = (hasSeer, hasApprenticeSeer, hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_beholder_kickoff_text"
    : "beholder_seer_kickoff_text",
  hasSeer && hasApprenticeSeer
    ? "beholder_seer_apprenticeseer_kickoff_text"
    : hasSeer
    ? "beholder_seer_kickoff_text"
    : "beholder_apprenticeseer_kickoff_text",
];


//? INFO: Beholder - Seer and Apprentice Seer stick up their thumbs for her to see, who may check their cards
export const beholder_interaction = (gameState, tokens, title) => {};

export const beholder_response =  (gameState, token, selected_positions, title) => {};

