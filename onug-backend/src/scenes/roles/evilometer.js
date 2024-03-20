//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const evilometer = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_evilometer_kickoff_text'
      : 'evilometer_kickoff_text',
    'evilometer_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 58 || (newGameState.players[token].card.player_role_id === 58 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 58 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = evilometer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const evilometer_interaction = (gameState, token, title) => {
  return {}
}
