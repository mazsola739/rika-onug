const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

export const pickpocket_narration = () => createPickpocket("pickpocket");
export const doppelganger_pickpocket_narration = () => createPickpocket("doppelganger_pickpocket");
