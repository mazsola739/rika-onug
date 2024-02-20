const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount_narration = () => createTheCount("thecount");
export const doppelganger_thecount_narration = () => createTheCount("doppelganger_thecount");
