const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest_narration = () => createPriest("priest");
export const doppelganger_priest_narration = () => createPriest("doppelganger_priest");
