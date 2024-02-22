//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"
import { robber_interaction } from "./robber"

export const roleretriever = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["roleretriever_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 66) {
    newGameState.players[token].scene_role_interaction.interaction = robber_interaction(newGameState, token)
   }
  })

  return newGameState
}
