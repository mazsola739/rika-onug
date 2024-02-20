const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "gremlin_kickoff2_text"]

export const gremlin = createGremlin("gremlin");
export const doppelganger_gremlin = createGremlin("doppelganger_gremlin");
