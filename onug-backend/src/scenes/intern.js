exports.intern = (hasDoppelganger, hasMadScientist) => [
  hasDoppelganger ? "doppelganger_intern_kickoff_text" : "intern_kickoff_text",
  hasMadScientist ? "intern_kickoff2_text" : "intern_kickoff_alone_text",
]
