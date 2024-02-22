import { getAllPlayerTokens } from "../utils"

export const mirrorman = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["mirrorman_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 64) {
    newGameState.players[token].scene_role_interaction.interaction = copycat_interaction(newGameState, token)
   }
  })

  return newGameState
}
