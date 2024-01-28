//TODO save wich interaction!

const randomFamilyman = [
  "familyman_1pleft_text",
  "familyman_1pright_text",
  "familyman_eachside_text",
  "familyman_2pleft_text",
  "familyman_2pright_text",
  "familyman_3pleft_text",
  "familyman_3pright_text",
  "familyman_4pleft_text",
  "familyman_4pright_text",
  "familyman_2eachside_text",
]

exports.familyman = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_familyman_kickoff_text"
    : "familyman_kickoff_text",
  getRandomItemFromArray(randomFamilyman),
  randomFamilyman.includes("1p")
    ? "familyman_is_end_text"
    : "familyman_are_end_text",
]
