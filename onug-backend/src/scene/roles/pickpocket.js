import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createPickpocket = (prefix) => () =>
  [`${prefix}_kickoff_text`, "pickpocket_kickoff2_text"]

export const pickpocket = (gameState) => {
  const newGameState = { ...gameState }
  const narration = []
  createPickpocket("pickpocket")
  createPickpocket("doppelganger_pickpocket")
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 36) {
    newGameState.players[token].scene_role_interaction.interaction = pickpocket_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const pickpocket_interaction = (gameState, token) => {return {}}
export const pickpocket_response =  (gameState, token, selected_positions) => {return {}}
