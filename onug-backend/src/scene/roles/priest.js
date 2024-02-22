import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest = (gameState) => {
  const newGameState = { ...gameState }
  const narration = []
  createPriest("priest")
  createPriest("doppelganger_priest")
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 37) {
    newGameState.players[token].scene_role_interaction.interaction = priest_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const priest_interaction = (gameState, token) => {return {}}
export const priest_response =  (gameState, token, selected_positions) => {return {}}






