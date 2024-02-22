//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const diseased = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['diseased_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 32) {
      interaction = diseased_interaction(newGameState, token)
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

export const diseased_interaction = (gameState, token) => {
  return {}
}
export const diseased_response = (gameState, token, selected_positions) => {
  return {}
}
