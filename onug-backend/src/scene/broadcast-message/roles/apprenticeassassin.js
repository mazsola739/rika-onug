const createApprenticeAssassin = (prefix) => (hasAssassin) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

exports.apprenticeassassin = () => createApprenticeAssassin("apprenticeassassin")
exports.doppelganger_apprenticeassassin = () => createApprenticeAssassin(
  "doppelganger_apprenticeassassin"
)
