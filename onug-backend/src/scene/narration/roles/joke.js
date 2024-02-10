const random_joke = [
  "joke_1_text",
  "joke_2_text",
  "joke_3_text",
  "joke_4_text",
  "joke_5_text",
  "joke_6_text",
  "joke_7_text",
  "joke_8_text",
  "joke_9_text",
  "joke_10_text",
  "joke_11_text",
  "joke_12_text",
  "joke_13_text",
  "joke_14_text",
  "joke_15_text",
  "joke_16_text",
  "joke_17_text",
  "joke_18_text",
  "joke_19_text",
  "joke_20_text",
]
const random_easteregg_nobadguys = [
  "easteregg_nobadguys_text_1",
  "easteregg_nobadguys_text_2",
  "easteregg_nobadguys_text_3",
  "easteregg_nobadguys_text_4",
  "easteregg_nobadguys_text_5",
  "easteregg_nobadguys_text_6",
  "easteregg_nobadguys_text_7",
  "easteregg_nobadguys_text_8",
  "easteregg_nobadguys_text_9",
  "easteregg_nobadguys_text_10",
]
const random_easteregg_nogoodguys = [
  "easteregg_nogoodguys_text_1",
  "easteregg_nogoodguys_text_2",
  "easteregg_nogoodguys_text_3",
  "easteregg_nogoodguys_text_4",
  "easteregg_nogoodguys_text_5",
  "easteregg_nogoodguys_text_6",
  "easteregg_nogoodguys_text_7",
  "easteregg_nogoodguys_text_8",
  "easteregg_nogoodguys_text_9",
  "easteregg_nogoodguys_text_10",
]

exports.joke = (totalPlayers, nobadguys, nogoodguys) => {
  const result = []
  if (totalPlayers === 12) {
    result.push("easteregg_really_text")
  } else if (nobadguys) {
    result.push(getRandomItemFromArray(random_easteregg_nobadguys))
  } else if (nogoodguys) {
    result.push(getRandomItemFromArray(random_easteregg_nogoodguys))
  } else {
    result.push(getRandomItemFromArray(random_joke))
  }
  return result
}
