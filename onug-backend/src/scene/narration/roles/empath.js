const { getRandomItemFromArray, pickRandomUpToThreePlayers } = require("../utils")

const empathAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
  "activePlayers",
]

const randomEmpath = [
  "empath_action1_text",
  "empath_action2_text",
  "empath_action3_text",
  "empath_action4_text",
  "empath_action5_text",
  "empath_action6_text",
  "empath_action7_text",
  "empath_action8_text",
  "empath_action9_text",
  "empath_action10_text",
  "empath_action11_text",
  "empath_action12_text",
  "empath_action13_text",
  "empath_action14_text",
]

const createEmpath = (kickoffText, totalPlayers) => () => {
  const randomIdentifier = getRandomItemFromArray(empathAllKeys)
  const randomInstructions = getRandomItemFromArray(randomEmpath)

  return [
    kickoffText,
    "empath_kickoff2_text",
    randomIdentifier === "activePlayers"
      ? pickRandomUpToThreePlayers(totalPlayers, "conjunction_and")
      : randomIdentifier,
    randomInstructions,
  ]
}

exports.empath = (totalPlayers) =>
  createEmpath("empath_kickoff_text", totalPlayers)()
exports.doppelganger_empath = (totalPlayers) =>
  createEmpath("doppelganger_empath_kickoff_text", totalPlayers)()
