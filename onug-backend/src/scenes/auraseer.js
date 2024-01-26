exports.auraseer = (hasDoppelganger, hasMarks) => [
  hasDoppelganger
    ? "doppelganger_auraseer_kickoff_text"
    : "auraseer_kickoff_text",
  hasMarks ? "auraseer_marks_and_cards_text" : "auraseer_cards_text",
]
