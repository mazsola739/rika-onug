const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest = () => createPriest("priest");
export const doppelganger_priest = () => createPriest("doppelganger_priest");
