const createCurator = (prefix) => () =>
  [`${prefix}_kickoff_text`, "curator_kickoff2_text"]

exports.curator = () => createCurator("curator")
exports.doppelganger_curator = () => createCurator("doppelganger_curator")
