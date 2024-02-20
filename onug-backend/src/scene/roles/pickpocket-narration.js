const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

export const pickpocket = () => createPickpocket("pickpocket");
export const doppelganger_pickpocket = () => createPickpocket("doppelganger_pickpocket");
