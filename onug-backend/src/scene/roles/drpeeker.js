//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const drpeeker = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["drpeeker_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 57) {
    newGameState.players[token].scene_role_interaction.interaction = drpeeker_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const drpeeker_interaction = (gameState, token) => {return {}}
export const drpeeker_response =  (gameState, token, selected_positions) => {return {}}
