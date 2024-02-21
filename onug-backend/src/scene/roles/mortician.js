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

export const mortician = (gameState) => createMortician("mortician_kickoff_text")

export const doppelganger_mortician = (gameState) => createMortician(
  "doppelganger_mortician_kickoff_text"
)


/* if (conditions.hasMorticianPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.mortician_interaction(newGameState, tokens, sceneTitle)
}
if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) {
  tokens = getTokensByOriginalIds(players, [1])
  return roles.doppelganger_mortician_interaction(newGameState, tokens, sceneTitle)
} */
//? INFO: Mortician - Looks at 1-2 neighbor cards (left or right), via app. Wins if at least one of his neighbors is killed
//TODO doppelganger
export const mortician_interaction = (gameState, tokens, title) => {}

export const mortician_response =  (gameState, token, selected_positions, title) => {}