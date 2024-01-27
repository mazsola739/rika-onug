const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

exports.thecount = () => createTheCount("thecount")
exports.doppelganger_thecount = () => createTheCount("doppelganger_thecount")
