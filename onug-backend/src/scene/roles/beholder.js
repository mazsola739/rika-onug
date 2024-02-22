import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const beholder = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_beholder_kickoff_text"
      : "beholder_seer_kickoff_text",
    hasSeer && hasApprenticeSeer
      ? "beholder_seer_apprenticeseer_kickoff_text"
      : hasSeer
      ? "beholder_seer_kickoff_text"
      : "beholder_apprenticeseer_kickoff_text",
  ] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 73) {
    newGameState.players[token].scene_role_interaction.interaction = beholder_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const beholder_interaction = (gameState, token) => {return {}}
export const beholder_response =  (gameState, token, selected_positions) => {return {}}
