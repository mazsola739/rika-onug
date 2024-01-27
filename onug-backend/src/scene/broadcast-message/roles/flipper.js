const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, "flipper_kickoff2_text"]

exports.flipper = createFlipper("flipper")
exports.doppelganger_flipper = createFlipper("doppelganger_flipper")
