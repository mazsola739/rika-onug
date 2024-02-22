import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const nostradamus = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["nostradamus_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 80) {
    newGameState.players[token].scene_role_interaction.interaction = nostradamus_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const nostradamus_interaction = (gameState, token) => {return {}}
export const nostradamus_response =  (gameState, token, selected_positions) => {return {}}

export const nostradamus_reaction = (gameState) => {
  const newGameState = { ...gameState }
  const narration =  [
    "nostradamus_teamstart_text",
    `nostradamus_team_${nostradamusTeam}_text`,
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration
  })

  return newGameState
}

