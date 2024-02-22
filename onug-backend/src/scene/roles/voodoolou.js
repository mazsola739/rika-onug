import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'
import { witch_interaction } from "./witch"

export const voodoolou = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ['voodoolou_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (newGameState.players[token].card.player_original_id === 70) {
      newGameState.players[token].scene_role_interaction.interaction = witch_interaction(newGameState)
    }
  })

  return newGameState
}
