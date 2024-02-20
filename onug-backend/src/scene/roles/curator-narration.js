const createCurator = (prefix) => () =>
  [`${prefix}_kickoff_text`, "curator_kickoff2_text"]

export const curator_narration = () => createCurator("curator");
export const doppelganger_curator_narration = () => createCurator("doppelganger_curator");
