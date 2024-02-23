//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const mirrorman = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['mirrorman_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 64) {
      interaction = mirrorman_interaction(newGameState, token, title)
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

export const mirrorman_interaction = (gameState, token, title) => {
  return {}
}
export const mirrorman_response = (gameState, token, selected_positions, title) => {
  return {}
}
