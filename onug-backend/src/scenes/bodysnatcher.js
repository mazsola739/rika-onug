const { getRandomItemFromArray } = require("./utils")

const randomBodysnatcher = [
  "bodysnatcher_steal_text",
  "bodysnatcher_center_text",
]
const bodysnatcherKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_bothneighbors_text",
]

const createBodysnatcher = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(randomBodysnatcher),
    getRandomItemFromArray(bodysnatcherKeys),
    "bodysnatcher_end_text",
  ]

exports.bodysnatcher = () => createBodysnatcher("bodysnatcher_kickoff_text")
exports.doppelganger_bodysnatcher = () => createBodysnatcher(
  "doppelganger_bodysnatcher_kickoff_text"
)
