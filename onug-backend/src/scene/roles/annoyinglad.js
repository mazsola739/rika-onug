//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"
import { thing_interaction } from "./thing"

export const annoyinglad = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["annoyinglad_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (newGameState.players[token].card.player_original_id === 55) {
      newGameState.players[token].scene_role_interaction.interaction = thing_interaction(newGameState, token)
    }
  })

  return newGameState
}

