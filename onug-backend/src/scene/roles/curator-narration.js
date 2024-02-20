const createCurator = (prefix) => () =>
  [`${prefix}_kickoff_text`, "curator_kickoff2_text"]

export const curator = () => createCurator("curator");
export const doppelganger_curator = () => createCurator("doppelganger_curator");
