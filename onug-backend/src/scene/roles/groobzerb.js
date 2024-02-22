import { groobAndZerbIds } from "../constants"
import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const groobzerb = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_groobzerb_kickoff_text"
      : "groobzerb_kickoff_text",
    "groobzerb_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (groobAndZerbIds.some(id => newGameState.players[token].card.player_role_id === id)) {
    newGameState.players[token].scene_role_interaction.interaction = groobzerb_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const groobzerb_interaction = (gameState, token) => {return {}}
export const groobzerb_response =  (gameState, token, selected_positions) => {return {}}
