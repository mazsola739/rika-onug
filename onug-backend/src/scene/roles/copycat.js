//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const copycat = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["copycat_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 30) {
    newGameState.players[token].scene_role_interaction.interaction = copycat_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const copycat_interaction = (gameState, token) => {return {}}
export const copycat_response =  (gameState, token, selected_positions) => {return {}}
