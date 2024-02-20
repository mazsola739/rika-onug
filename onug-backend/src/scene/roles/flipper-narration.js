const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, "flipper_kickoff2_text"]

export const flipper = createFlipper("flipper");
export const doppelganger_flipper = createFlipper("doppelganger_flipper");
