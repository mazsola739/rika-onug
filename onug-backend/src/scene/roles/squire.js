import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const squire = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_squire_kickoff_text" : "squire_kickoff_text",
    "squire_kickoff2_text",
  ] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 83) {
    newGameState.players[token].scene_role_interaction.interaction = squire_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const squire_interaction = (gameState, token) => {return {}}
export const squire_response =  (gameState, token, selected_positions) => {return {}}
