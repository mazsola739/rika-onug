//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const instigator = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["instigator_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 34) {
    newGameState.players[token].scene_role_interaction.interaction = instigator_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const instigator_interaction = (gameState, token) => {return {}}
export const instigator_response =  (gameState, token, selected_positions) => {return {}}
