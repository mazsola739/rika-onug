const { getRandomItemFromArray } = require("../utils")

//TODO save wich interaction!

const randomExposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]

const createExposer = (kickoffText) => () =>
  [kickoffText, getRandomItemFromArray(randomExposer)]

exports.exposer = () => createExposer("exposer_kickoff_text")
exports.doppelganger_exposer = () =>
  createExposer("doppelganger_exposer_kickoff_text")
