import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const evilometer = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_evilometer_kickoff_text"
      : "evilometer_kickoff_text",
    "evilometer_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 58) {
    newGameState.players[token].scene_role_interaction.interaction = evilometer_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const evilometer_interaction = (gameState, token) => {return {}}

