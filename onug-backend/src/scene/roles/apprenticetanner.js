import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const apprenticetanner = (gameState) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? "doppelganger_apprenticetanner_kickoff_text"
      : "apprenticetanner_kickoff_text",
    "apprenticetanner_kickoff2_text",
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 71) {
    newGameState.players[token].scene_role_interaction.interaction = apprenticetanner_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const apprenticetanner_interaction = (gameState, token) => {
  const newGameState = { ...gameState }
  
    const tanner = getTannerNumberByRoleIds(newGameState.players)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      tanner: tanner
    }
  
    return generateRoleInteraction(
      newGameState,
      private_message = ['interaction_tanner'],
      icon = 'tanner',
      uniqInformations = { tanner: tanner },
    )
}

