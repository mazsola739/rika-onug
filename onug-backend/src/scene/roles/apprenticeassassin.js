import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

const createApprenticeAssassin = (prefix) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

export const apprenticeassassin = (gameState) => {
  const newGameState = { ...gameState }
  createApprenticeAssassin("apprenticeassassin")
  createApprenticeAssassin("doppelganger_apprenticeassassin")
  const narration = []
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 28) {
    newGameState.players[token].scene_role_interaction.interaction = apprenticeassassin_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const apprenticeassassin_interaction = (gameState, token) => {return {}}
export const apprenticeassassin_response =  (gameState, token, selected_positions) => {return {}}
