const addVerboseOr = (rolesFromIds) => {
  if (rolesFromIds.length > 1) {
    rolesFromIds.splice(
      rolesFromIds.length - 1,
      0,
      "doppelganger_verbose_or_text"
    )
  }
  return rolesFromIds
}

export const doppelganger_narration = () => ["doppelganger_kickoff_text"];

export const doppelganger_instant_action = (rolesFromIds) => [
  "doppelganger_verbose_intro_text",
  ...addVerboseOr(rolesFromIds),
  "doppelganger_verbose_outro_text",
];
