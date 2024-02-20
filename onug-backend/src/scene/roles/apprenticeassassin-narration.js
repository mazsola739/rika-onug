const createApprenticeAssassin = (prefix) => (hasAssassin) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

export const apprenticeassassin = () => createApprenticeAssassin("apprenticeassassin");

export const doppelganger_apprenticeassassin = () => createApprenticeAssassin(
  "doppelganger_apprenticeassassin"
);
