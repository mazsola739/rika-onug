//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const rapscallion = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["rapscallion_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 65) {
    newGameState.players[token].scene_role_interaction.interaction = rapscallion_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const rapscallion_interaction = (gameState, token) => {return {}}
export const rapscallion_response =  (gameState, token, selected_positions) => {return {}}
