const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

export const assassin = () => createAssassin("assassin");
export const doppelganger_assassin = () => createAssassin("doppelganger_assassin");
