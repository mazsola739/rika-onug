//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const renfield = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (
      newGameState.players[token].card.player_original_id === 38 ||
      (newGameState.players[token].card.role_id === 38 &&
        newGameState.players[token].card.player_original_id === 1)
    ) {
      interaction = renfield_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const renfield_interaction = (gameState, token) => {
  return {}
}
export const renfield_response = (gameState, token, selected_positions) => {
  return {}
}
