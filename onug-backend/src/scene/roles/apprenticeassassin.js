const createApprenticeAssassin = (prefix) => (hasAssassin) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

export const apprenticeassassin_narration = () => createApprenticeAssassin("apprenticeassassin");

export const doppelganger_apprenticeassassin_narration = () => createApprenticeAssassin(
  "doppelganger_apprenticeassassin"
);


//TODO doppelganger
//? INFO: Apprentice Assassin - Wakes up to see who the Assassin is he can only win if the Assassin  dies. If there is no Assassin, he becomes the Assassin
//! NO flipped card but shield
export const apprenticeassassin_interaction = (gameState, tokens, title) => {};

export const apprenticeassassin_response_interaction =  (gameState, token, selected_positions, title) => {};
