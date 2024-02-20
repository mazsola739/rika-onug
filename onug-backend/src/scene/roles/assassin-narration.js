const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

export const assassin_narration = () => createAssassin("assassin");
export const doppelganger_assassin_narration = () => createAssassin("doppelganger_assassin");
