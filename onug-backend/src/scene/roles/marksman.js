import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const marksman = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_marksman_kickoff_text"
      : "marksman_kickoff_text",
    "marksman_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 35) {
    newGameState.players[token].scene_role_interaction.interaction = marksman_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const marksman_interaction = (gameState, token) => {return {}}
export const marksman_response =  (gameState, token, selected_positions) => {return {}}
