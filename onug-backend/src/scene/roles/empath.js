import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

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

export const empath = (gameState) => {
  const newGameState = { ...gameState }
  createEmpath("empath_kickoff_text", totalPlayers)
  createEmpath("doppelganger_empath_kickoff_text", totalPlayers)
  const narration = []
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 77) {
    newGameState.players[token].scene_role_interaction.interaction = empath_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const empath_interaction = (gameState, token) => {return {}}
export const empath_response =  (gameState, token, selected_positions) => {return {}}
