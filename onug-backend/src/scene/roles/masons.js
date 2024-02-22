import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const masons = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["masons_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (masonIds.some(id => newGameState.players[token].card.player_role_id === id)) {
    newGameState.players[token].scene_role_interaction.interaction = masons_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const masons_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const masons = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    masons: masons
  }

  return generateRoleInteraction(
    newGameState,
    private_message = ['interaction_masons'],
    icon = 'mason',
    uniqInformations = { masons: masons },
  )
}
