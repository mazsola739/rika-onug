//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, "assassin_kickoff2_text"]

export const assassin = (gameState, prefix) => {
  const newGameState = { ...gameState }
  const narration = createAssassin(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (prefix === 'assassin') {
      if (newGameState.players[token].card.player_original_id === 29) {
        newGameState.players[token].scene_role_interaction.interaction = assassin_interaction(newGameState, token)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (newGameState.players[token].card.role_id === 29 && newGameState.players[token].card.player_original_id === 1) {
        newGameState.players[token].scene_role_interaction.interaction = assassin_interaction(newGameState, token)
      }
    }
  })

  return newGameState
}

export const assassin_interaction = (gameState, token) => {return {}}
export const assassin_response =  (gameState, token, selected_positions) => {return {}}
