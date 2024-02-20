const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount = () => createTheCount("thecount");
export const doppelganger_thecount = () => createTheCount("doppelganger_thecount");
