//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"
import { insomniac_interaction } from "./insomniac"

export const selfawarenessgirl = (gameState, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_selfawarenessgirl_kickoff_text"
      : "selfawarenessgirl_kickoff_text",
    "selfawarenessgirl_kickoff2_text",
  ] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 67) {
    newGameState.players[token].scene_role_interaction.interaction = insomniac_interaction(newGameState, token)
   }
  })

  return newGameState
}
