import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "gremlin_kickoff2_text"]

export const gremlin = (gameState) => {
  const newGameState = { ...gameState }
  createGremlin("gremlin")
  createGremlin("doppelganger_gremlin")
  const narration = []
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 33) {
    newGameState.players[token].scene_role_interaction.interaction = gremlin_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const gremlin_interaction = (gameState, token) => {return {}}
export const gremlin_response =  (gameState, token, selected_positions) => {return {}}
