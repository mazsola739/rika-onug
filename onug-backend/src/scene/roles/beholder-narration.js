export const beholder = (hasSeer, hasApprenticeSeer, hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_beholder_kickoff_text"
    : "beholder_seer_kickoff_text",
  hasSeer && hasApprenticeSeer
    ? "beholder_seer_apprenticeseer_kickoff_text"
    : hasSeer
    ? "beholder_seer_kickoff_text"
    : "beholder_apprenticeseer_kickoff_text",
];
