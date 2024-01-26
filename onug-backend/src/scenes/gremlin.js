const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "gremlin_kickoff2_text"]

exports.gremlin = createGremlin("gremlin")
exports.doppelganger_gremlin = createGremlin("doppelganger_gremlin")
