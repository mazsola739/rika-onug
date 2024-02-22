import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createFlipper = (prefix) => () =>
  [`${prefix}_kickoff_text`, "flipper_kickoff2_text"]

export const flipper = (gameState) => {
  const newGameState = { ...gameState }
  createFlipper("flipper")
  createFlipper("doppelganger_flipper")
  const narration = []
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 59) {
    newGameState.players[token].scene_role_interaction.interaction = revealer_response(newGameState, token)
   }
  })

  return newGameState
}
