//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const squire = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_squire_kickoff_text'
      : 'squire_kickoff_text',
    'squire_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 83 || (newGameState.players[token].card.role_id === 83 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 83 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = squire_interaction(newGameState, token, title)
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

export const squire_interaction = (gameState, token, title) => {
  return {}
}
export const squire_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
