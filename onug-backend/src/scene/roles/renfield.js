//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const renfield = (gameState, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_renfield_kickoff_text" : "renfield_kickoff_text",
    "renfield_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 38 || (newGameState.players[token].card.role_id === 38 && newGameState.players[token].card.player_original_id === 1)) {
    newGameState.players[token].scene_role_interaction.interaction = renfield_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const renfield_interaction = (gameState, token) => {return {}}
export const renfield_response =  (gameState, token, selected_positions) => {return {}}
