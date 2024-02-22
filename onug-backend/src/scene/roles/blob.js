import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const randomBlobKickoffText = [
  "blob_1pleft_text",
  "blob_1pright_text",
  "blob_eachside_text",
  "blob_2pleft_text",
  "blob_2pright_text",
  "blob_3pleft_text",
  "blob_3pright_text",
  "blob_4pleft_text",
  "blob_4pright_text",
  "blob_2eachside_text",
]

export const blob = (gameState) => {
  const newGameState = { ...gameState }
  const randomKickoff = getRandomItemFromArray(randomBlobKickoffText)
  const narration = [
    randomKickoff,
    randomKickoff.includes("1p") ? "blob_is_end_text" : "blob_are_end_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 44) {
    newGameState.players[token].scene_role_interaction.interaction = blob_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const blob_interaction = (gameState, token) => {return {}}
