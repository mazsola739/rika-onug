//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"
import { seer_interaction } from "./seer"

export const detector = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["detector_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 56) {
    newGameState.players[token].scene_role_interaction.interaction = seer_interaction(newGameState, token)
   }
  })

  return newGameState
}
