//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const diseased = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['diseased_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 32) {
      interaction = diseased_interaction(newGameState, token, title)
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

export const diseased_interaction = (gameState, token, title) => {
  return {}
}
export const diseased_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
