//@ts-check
import { vampireIds } from '../../constant'
import { getAllPlayerTokens } from "../../utils/scene"

export const vampires = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']

  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    newGameState.players[token].scene_role_interaction.narration = narration

    if (vampireIds.some(id => newGameState.players[token].card.player_role_id === id)) {
      newGameState.players[token].scene_role_interaction.interaction = vampires_interaction(newGameState, token)
    }
  })

  return newGameState
}

export const vampires_interaction = (gameState, token) => {return {}}
export const vampires_response =  (gameState, token, selected_positions) => {return {}}