//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, "thecount_kickoff2_text"]

export const thecount = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createTheCount(prefix)

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (prefix === 'thecount') {
      if (newGameState.players[token].card.player_original_id === 39) {
        newGameState.players[token].scene_role_interaction.interaction = thecount_interaction(newGameState, token)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (newGameState.players[token].card.role_id === 39 && newGameState.players[token].card.player_original_id === 1) {
        newGameState.players[token].scene_role_interaction.interaction = thecount_interaction(newGameState, token)
      }
    }
  })

  return newGameState
}

export const thecount_interaction = (gameState, token) => {return {}}
export const thecount_response =  (gameState, token, selected_positions) => {return {}}
