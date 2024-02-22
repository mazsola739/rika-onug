import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const detector = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["detector_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 56) {
    newGameState.players[token].scene_role_interaction.interaction = seer_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const cupid_interaction = (gameState, token) => {return {}}
export const cupid_response =  (gameState, token, selected_positions) => {return {}}
