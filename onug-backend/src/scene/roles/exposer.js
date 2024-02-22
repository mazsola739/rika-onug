//@ts-check
import { getAllPlayerTokens, getRandomItemFromArray } from "../../utils/scene"

const randomExposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]

const createExposer = (prefix) => () =>
  [`${prefix}_kickoff_text`, getRandomItemFromArray(randomExposer)]

export const exposer = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createExposer(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 46) {
    newGameState.players[token].scene_role_interaction.interaction = exposer_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const exposer_interaction = (gameState, token) => {return {}}
export const exposer_response =  (gameState, token, selected_positions) => {return {}}
