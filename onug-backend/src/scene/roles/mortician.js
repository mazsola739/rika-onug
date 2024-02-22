//@ts-check
import { getAllPlayerTokens, getRandomItemFromArray } from "../../utils/scene"

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
      random_mortician === "mortician_2cards_text" //TODO FIX HERE
        ? morticianAllKeys
        : ["identifier_bothneighbors_text"]
    ),
  ]


export const mortician = (gameState, prefix) => { //TODO prefix
  const newGameState = { ...gameState }
  const narration = []
  createMortician("mortician_kickoff_text")
  createMortician("doppelganger_mortician_kickoff_text")
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 36) {
    newGameState.players[token].scene_role_interaction.interaction = mortician_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const mortician_interaction = (gameState, token) => {return {}}
export const mortician_response =  (gameState, token, selected_positions) => {return {}}
