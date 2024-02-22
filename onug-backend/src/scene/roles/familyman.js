import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

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

export const familyman = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_familyman_kickoff_text"
      : "familyman_kickoff_text",
    getRandomItemFromArray(randomFamilyman),
    randomFamilyman.includes("1p")
      ? "familyman_is_end_text"
      : "familyman_are_end_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 78) {
    newGameState.players[token].scene_role_interaction.interaction = familyman_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const familyman_interaction = (gameState, token) => {return {}}
export const familyman_response =  (gameState, token, selected_positions) => {return {}}
