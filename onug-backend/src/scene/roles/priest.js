//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, "priest_kickoff2_text"]

export const priest = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPriest(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (prefix === 'priest') {
      if (newGameState.players[token].card.player_original_id === 37) {
        newGameState.players[token].scene_role_interaction.interaction = priest_interaction(newGameState, token)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (newGameState.players[token].card.role_id === 37 && newGameState.players[token].card.player_original_id === 1) {
        newGameState.players[token].scene_role_interaction.interaction = priest_interaction(newGameState, token)
      }
    }
  })

  return newGameState
}

export const priest_interaction = (gameState, token) => {return {}}
export const priest_response =  (gameState, token, selected_positions) => {return {}}






