const createTheCountArray = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

exports.thecount = () => createTheCountArray("thecount")
exports.doppelganger_thecount = () =>
  createTheCountArray("doppelganger_thecount")
