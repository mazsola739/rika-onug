import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount = (gameState) => {
  const newGameState = { ...gameState }

  createTheCount("thecount")
  createTheCount("doppelganger_thecount")
  const narration = ['vampires_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration
    
    if (newGameState.players[token].card.player_original_id === 39) {
      newGameState.players[token].scene_role_interaction.interaction = thecount_interaction(newGameState)
    }
  })

  return newGameState
}

export const thecount_interaction = (gameState, token) => {return {}}
export const thecount_response =  (gameState, token, selected_positions) => {return {}}
