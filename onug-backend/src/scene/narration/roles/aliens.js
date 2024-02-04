const { pickRandomUpToThreePlayers } = require("../utils")

//TODO save which interaction!

const random_aliens = [
  "aliens_view_text",
  "aliens_allview_text",
  "aliens_stare_text",
  "aliens_left_text",
  "aliens_right_text",
  "aliens_show_text",
  "aliens_timer_text",
  "aliens_newalien_text",
  "aliens_alienhelper_text",
]
const alienAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "activePlayers",
]
const alienAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
]

exports.aliens = (totalPlayers) => {
  const result = ["aliens_kickoff_text"]
  const randomInstructions = getRandomItemFromArray(random_aliens)

  result[1] = randomInstructions

  if (randomInstructions.includes("view")) {
    let randomAnyIdentifier = getRandomItemFromArray(alienAnyKeys)
    if (randomAnyIdentifier === "activePlayers") {
      randomAnyIdentifier = pickRandomUpToThreePlayers(
        totalPlayers,
        "conjunction_or"
      )
    }
    result[2] = randomAnyIdentifier
  }

  if (
    randomInstructions === "aliens_newalien_text" ||
    randomInstructions === "aliens_alienhelper_text"
  ) {
    const randomAllIdentifier = getRandomItemFromArray(alienAllKeys)
    result[2] = randomAllIdentifier
  }

  return result
}
