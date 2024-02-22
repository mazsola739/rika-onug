//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const cupid = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["cupid_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 31) {
    newGameState.players[token].scene_role_interaction.interaction = cupid_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const cupid_interaction = (gameState, token) => {return {}}
export const cupid_response =  (gameState, token, selected_positions) => {return {}}
