//@ts-check
import { getAllPlayerTokens } from "../../utils/scene"

const createApprenticeAssassin = (hasAssassin, prefix) =>
  [
    `${prefix}_kickoff_text`,
    hasAssassin
      ? "apprenticeassassin_assassin_text"
      : "apprenticeassassin_alone_text",
  ]

export const apprenticeassassin = (gameState, hasAssassin, prefix) => {
  const newGameState = { ...gameState }
  const narration = createApprenticeAssassin(hasAssassin, prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (prefix === 'assassin') {
      if (newGameState.players[token].card.player_original_id === 28) {
        newGameState.players[token].scene_role_interaction.interaction = apprenticeassassin_interaction(newGameState, token)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (newGameState.players[token].card.role_id === 28 && newGameState.players[token].card.player_original_id === 1) {
        newGameState.players[token].scene_role_interaction.interaction = apprenticeassassin_interaction(newGameState, token)
      }
    }
  })

  return newGameState
}

export const apprenticeassassin_interaction = (gameState, token) => {return {}}
export const apprenticeassassin_response =  (gameState, token, selected_positions) => {return {}}
