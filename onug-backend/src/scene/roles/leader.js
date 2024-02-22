import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const leader = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? "doppelganger_leader_kickoff_text" : "leader_kickoff_text",
    "leader_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 48) {
    newGameState.players[token].scene_role_interaction.interaction = leader_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const leader_interaction = (gameState, token) => {return {}}

export const leader_zerbgroob = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["leader_zerbgroob_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 48) {
    newGameState.players[token].scene_role_interaction.interaction = leader_zerbgroob_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const leader_zerbgroob_interaction = (gameState, token) => {return {}}
