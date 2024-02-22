//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const diseased = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["diseased_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 32) {
    newGameState.players[token].scene_role_interaction.interaction = diseased_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const diseased_interaction = (gameState, token) => {return {}}
export const diseased_response =  (gameState, token, selected_positions) => {return {}}
