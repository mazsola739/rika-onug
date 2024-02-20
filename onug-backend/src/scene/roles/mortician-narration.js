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

export const mortician_narration = () => createMortician("mortician_kickoff_text");

export const doppelganger_mortician_narration = () => createMortician(
  "doppelganger_mortician_kickoff_text"
);
