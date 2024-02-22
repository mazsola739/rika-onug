import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const temptress = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["temptress_kickoff_text"] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 69) {
    newGameState.players[token].scene_role_interaction.interaction = temptress_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const temptress_interaction = (gameState, token) => {return {}}
export const temptress_response =  (gameState, token, selected_positions) => {return {}}
