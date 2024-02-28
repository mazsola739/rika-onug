//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const renfield = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 38 || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 1) || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 38 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = renfield_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const renfield_interaction = (gameState, token, title) => {
  return {}
}
export const renfield_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
