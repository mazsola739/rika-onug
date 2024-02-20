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
