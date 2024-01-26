const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

exports.pickpocket = () => createPickpocket("pickpocket")
exports.doppelganger_pickpocket = () => createPickpocket("doppelganger_pickpocket")
