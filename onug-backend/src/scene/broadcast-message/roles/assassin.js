const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

exports.assassin = () => createAssassin("assassin")
exports.doppelganger_assassin = () => createAssassin("doppelganger_assassin")
