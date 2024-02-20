const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

exports.priest = () => createPriest("priest")
exports.doppelganger_priest = () => createPriest("doppelganger_priest")
