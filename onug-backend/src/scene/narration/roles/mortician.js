//TODO save which interaction!

const random_mortician = ["mortician_1card_text", "mortician_2cards_text"]

const morticianAllKeys = [
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
  "identifier_oneneighbor_text",
  "identifier_yourself_text",
]

const createMortician = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(random_mortician),
    getRandomItemFromArray(
      random_mortician === "mortician_2cards_text"
        ? morticianAllKeys
        : ["identifier_bothneighbors_text"]
    ),
  ]

exports.mortician = () => createMortician("mortician_kickoff_text")
exports.doppelganger_mortician = () => createMortician(
  "doppelganger_mortician_kickoff_text"
)
