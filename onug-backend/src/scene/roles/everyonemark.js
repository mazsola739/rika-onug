//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

export const everyonemark = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["everyone_mark_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration
   newGameState.players[token].scene_role_interaction.interaction = everyonemark_interaction(newGameState, token)
  })

  return newGameState
}

export const everyonemark_interaction = (gameState, token) => {return {}}

