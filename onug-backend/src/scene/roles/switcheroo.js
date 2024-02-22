//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"
import { troublemaker_interaction } from "./troublemaker"

export const switcheroo = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["switcheroo_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (newGameState.players[token].card.player_original_id === 68) {
      newGameState.players[token].scene_role_interaction.interaction = troublemaker_interaction(newGameState, token)
    }
  })

  return newGameState
}
