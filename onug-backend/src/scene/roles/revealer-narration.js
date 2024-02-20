const createRevealer = (prefix) => () =>
  [`${prefix}_kickoff_text`, "revealer_kickoff2_text"]

export const revealer = () => createRevealer("revealer");
export const doppelganger_revealer = () => createRevealer("doppelganger_revealer");
