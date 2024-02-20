const createRevealer = (prefix) => () =>
  [`${prefix}_kickoff_text`, "revealer_kickoff2_text"]

export const revealer_narration = () => createRevealer("revealer");
export const doppelganger_revealer_narration = () => createRevealer("doppelganger_revealer");
