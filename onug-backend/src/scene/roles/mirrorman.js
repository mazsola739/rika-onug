//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const mirrorman = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["mirrorman_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 64) {
    newGameState.players[token].scene_role_interaction.interaction = mirrorman_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const mirrorman_interaction = (gameState, token) => {return {}}
export const mirrorman_response =  (gameState, token, selected_positions) => {return {}}