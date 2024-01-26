const createRevealer = (prefix) => () =>
  [`${prefix}_kickoff_text`, "revealer_kickoff2_text"]

exports.revealer = () => createRevealer("revealer")
exports.doppelganger_revealer = () => createRevealer("doppelganger_revealer")
