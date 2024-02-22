//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const cow = (gameState, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_cow_kickoff_text" : "cow_kickoff_text",
    "cow_kickoff2_text",
  ] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 45 || (newGameState.players[token].card.role_id === 45 && newGameState.players[token].card.player_original_id === 1)) {
    newGameState.players[token].scene_role_interaction.interaction = cow_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const cow_interaction = (gameState, token) => {return {}}